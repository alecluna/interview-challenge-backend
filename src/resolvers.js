//get all colors, get color by specific ID, or get color by specific name
const resolvers = {
  Query: {
    getColors: (parent, { args }, { db }, info) => db.Color.findAll(),
    getColorsPaginate: (parent, { pagination }, { db }, info) =>
      db.Color.findAll({
        limit: pagination.take,
        offset: pagination.skip
      }),
    getColorID: (parent, { id }, { db }, info) => db.Color.findByPk(id),
    getColorName: (parent, { color: findColor }, { db }, info) =>
      db.Color.findOne({ where: { color: findColor } })
  }
};

export default resolvers;
