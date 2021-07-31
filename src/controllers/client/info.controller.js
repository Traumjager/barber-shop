const getClients = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;

  if (id) {
    // get the barber with the id
  } else {
    // get all the barber ( without "the" "nagsha "s)
  }
};

const updateClients = async (req, res, next) => {
  // when the barber wants to update his profile
};

module.exports = {
  getClients,
  updateClients,
};
