import hive from '../models/hive';
import * as customErrors from '../utils/errors/CustomErrors';
import { hiveAnswer, hivesAnswer } from '../utils/answers/hiveAnswers';

export default {
  createHive(req: any, res: any, next: any) {
    const owner = req.user._id;
    const { title, apiary, frames } = req.body;
    console.log(title, apiary, frames); 
    hive.createHive(title, apiary, owner, frames)
      .then((hive: any) => res.send(hiveAnswer(hive)))
      .catch(next);
  },

  getHiveById(req: any, res: any, next: any) {
    const userId = req.user._id;
    const id = req.params.hiveId;

    hive.getHiveById(id)
      .then((hive: any) => {
        userId === hive.owner.toString()
          ? res.send(hiveAnswer(hive))
          : next(new customErrors.Error401('Attempt to get another\'s owner hive'))
      })
      .catch(next);
  },

  getHivesByApiaryId(req: any, res: any, next: any) {
    const userId = req.user._id;
    const apiaryId = req.params.apiaryId;

    hive.getHivesByApiaryId(apiaryId, userId)
      .then((hives: any) => res.send(hivesAnswer(hives)))
      .catch(next);
  },

  updateHiveTitle(req: any, res: any, next: any) {
    const userId = req.user._id;
    const hiveId = req.params.hiveId;
    const newTitle = req.body.title;

    hive.getHiveById(hiveId)
      .then((foundHive: any) => {
        if (foundHive.owner.toString() === userId) {
          hive.updateHiveTitle(hiveId, newTitle)
            .then((updatedHive: any) => res.send(hiveAnswer(updatedHive)))
            .catch(next);
        } else {
          next(new customErrors.Error401('Attempt to edit another\'s owner hive'));
        }})
      .catch(next);
  },

  updateHiveFrames(req: any, res: any, next: any) {
    const userId = req.user._id;
    const hiveId = req.params.hiveId;
    const newFrames = req.body.frames;

    hive.getHiveById(hiveId)
      .then((foundHive: any) => {
        if (foundHive.owner.toString() === userId) {
          hive.updateHiveFrames(hiveId, newFrames)
            .then((updatedHive: any) => res.send(hiveAnswer(updatedHive)))
            .catch(next);
        } else {
          next(new customErrors.Error401('Attempt to edit another\'s owner hive'));
        }})
      .catch(next);
  },
};
