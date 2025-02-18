/**
 * Handles Board operations
 */
module.exports = class BoardService {
  constructor({ id }) {
    this.id = id;
  }

  /**
   * Creates a Board.
   *
   * @param {*} data
   */
  async create(data) {
    try {
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a Board.
   *
   * @param {*} id
   * @param {*} data
   */
  async update(id, data) {
    try {
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes a Board.
   *
   * @param {*} id
   */
  async remove(id) {
    try {
    } catch (error) {
      throw error;
    }
  }

  /**
   * Destroy all Boards with the ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    try {
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds the Board by Id.
   *
   * @param {*} id
   */
  async findById(id) {}

  /**
   * Import a list of Boards.
   *
   * @param {*} data
   */
  async import(data) {
    return this.create();
  }
};
