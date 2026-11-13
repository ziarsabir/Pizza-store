// Trusted menu prices used by the backend when creating Stripe payments.
//
// Prices are stored in pence because Stripe expects amounts
// in the smallest currency unit.
// Example: £12.00 = 1200 pence.

const menuCatalog = {
  "Garlic Bread": 500,
  "Tomato Soup": 450,
  "Pomodoro Bruschetta": 500,
  "Arancini": 600,
  "Calamari Fritti": 750,

  "Spaghetti Carbonara": 1000,
  "Grilled Chicken": 1500,
  "Lasagna al Forno": 1250,
  "Risotto Funghi": 1300,

  "Pepperoni Pizza": 1200,
  "Margherita": 900,
  "Reggio Calabria": 1050,
  "Parma": 1050,
  "Quattro Formaggi": 1100,
  "Diavola": 1150,

  "Chocolate Cake": 600,
  "Ice Cream": 400,
  "Tiramisu": 700,
  "Panna Cotta": 650,

  "The Long White Sauvignon Blanc White Wine": 2400,
  "Peroni Beer": 500,
  "Aperol Spritz": 800,
  "Negroni": 900,
  "Lemonade": 300,
  "Iced Tea": 350,
  "San Pellegrino": 350,
  "Espresso": 250,
};

module.exports = menuCatalog;
