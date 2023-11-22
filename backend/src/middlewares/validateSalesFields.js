const validateSalesFields = (req, res, next) => {
  const saleData = req.body;

  const hasProductId = saleData.every((sale) => 'productId' in sale);
  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  const hasQuantity = saleData.every((sale) => 'quantity' in sale);
  if (!hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const isValidQuantity = saleData.every((sale) => sale.quantity > 0);
  if (!isValidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = validateSalesFields;