function createBaseController(model) {
  return {
    getAll: async (req, res, next) => {
      try {
        const docs = await model.find();
        res.json(docs);
      } catch (error) {
        return next(new (await import('../utils/appError.js')).default('Error fetching all: ' + error.message, 500));
      }
    },
    getById: async (req, res, next) => {
      try {
        const doc = await model.findById(req.params.id);
        if (!doc) return next(new (await import('../utils/appError.js')).default('Not found', 404));
        res.json(doc);
      } catch (error) {
        return next(new (await import('../utils/appError.js')).default('Error fetching by id: ' + error.message, 500));
      }
    }
  };
}

export default createBaseController;
