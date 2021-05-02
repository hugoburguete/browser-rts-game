import { Request, Response } from 'express';
import { serializeVillage } from '../entities/village.entity';
import { VillageModel } from '../models/village.model';
import { updateVillage } from '../services/village-manager';

export const get = async (req: Request, res: Response) => {
  const villageModel = new VillageModel('1');
  try {
    let village = await villageModel.findByUserId(req.body.user._id);

    if (!village) {
      throw new Error("No village found");
    }

    let {
      updatedVillage,
      updates
    } = updateVillage(village);

    await villageModel.updateById(village._id || '', updates);
    village = serializeVillage(updatedVillage);

    res.json(village);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: {
        type: '',
        message: err.message,
      }
    })
  }
}
