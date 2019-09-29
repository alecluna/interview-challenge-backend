//get all colors, get color by specific ID, or get color by specific name
const resolvers = {
  Query: {
    getColors: (parent, { args }, { db }, info) => db.Color.findAll(),
    getColorsPaginate: (parent, { args, pagination }, { db }, info) =>
      db.Color.findAll({
        limit: pagination.take,
        offset: pagination.skip
      }).catch(err => console.log(err)),
    getColorID: (parent, { id }, { db }, info) =>
      db.Color.findByPk(id).catch(err => console.log(err)),
    getColorName: (parent, { color: findColor }, { db }, info) =>
      db.Color.findOne({ where: { color: findColor } }).catch(err =>
        console.log(err)
      )
  }
};

export default resolvers;
