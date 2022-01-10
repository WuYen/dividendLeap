//import 所有model => 然後重新export
//提供 common function EX: CRUD

function Base(Model) {
  async function add(payload) {
    let result = await new Model(payload).save();
    return result;
  }

  function addMany(payload) {
    let result = await await Model.insertMany(payload);
    return result;
  }

  async function remove(payload) {
    let result = await new Model(payload).save();
    return result;
  }

  function removeMany(payload) {
    let result = await await Model.insertMany(payload);
    return result;
  }

  return { add, addMany };
}
