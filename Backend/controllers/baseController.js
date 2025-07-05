function createBaseController(model) {
  return {
    getAll: async (req, res) => {
      try {
        const docs = await model.find();
        res.json(docs);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    getById: async (req, res) => {
      try {
        const doc = await model.findById(req.params.id);
        if (!doc) return res.status(404).json({ error: 'Not found' });
        res.json(doc);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
}

export default createBaseController;
