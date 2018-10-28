// Business Logic

  // Pizza Object
function Pizza (pizzaSize) {
  this.pizzaSize = pizzaSize;
  this.toppings = [];
  this.cheeses = [];
  this.salads = [];
}

  // Determining Pizza order cost with a prototype loop!
Pizza.prototype.pizzaCost = function () {
  var cost = 0.00;
  switch (this.pizzaSize) {
    case "Small": cost += 8;
      break;
    case "Medium": cost += 10;
      break;
    case "Large": cost += 12;
      break;
    case "Stupid Massive Pizza": cost += 18;
      break;
  }
  for (var i in this.toppings) {
    cost += 5;
  }
  for (var i in this.cheeses) {
    cost += 4;
  }
  for (var i in this.salads) {
    cost += 2;
  }
  return cost;
}

  // Set up Object for Orders
function Order (customer) {
  this.customer = customer;
  this.pizzas = [];
}

Order.prototype.totalCost = function() {
  var cost = 0;
  for (var i in this.pizzas) {
    cost += this.pizzas[i].pizzaCost();
  }
  return cost -= 0.01;
}

Order.prototype.totalAmount = function(size) {
  var amount = 0;
  for (var i in this.pizzas) {
    if (this.pizzas[i].pizzaSize === size) {
      amount += 1;
    }
  }
  return amount;
}

// User Interface Logic
var fillOrderForm = function(order) {
  $("#total-form").append($("<div id='result'>"))
    for (var i in order.pizzas) {
      $("#result").append($("<p><strong>" + order.pizzas[i].pizzaSize + "</strong></p>"));
      for (var toppingId in order.pizzas[i].toppings) {
        $("#result").append($("<span> ♦ " + order.pizzas[i].toppings[toppingId] + "</span>"));
      }
      for (var cheeseId in order.pizzas[i].cheeses) {
        $("#result").append($("<span> ♦ " + order.pizzas[i].cheeses[cheeseId] + "</span>"));
      }
      for (var saladId in order.pizzas[i].salads) {
        $("#result").append($("<span> ♦ " + order.pizzas[i].salads[saladId] + "</span>"));
      }
      $("#result").append($("<span> ♦ </span>"));
      $("#result").append($("<p class='cost'><strong>Price: $" + order.pizzas[i].pizzaCost() + "</strong></p>"));
      $("#result").append($("<hr>"));
    }
    $("#total-form").append($("</div>"));
}

var fillTotalCostForm = function (order) {
  var size = ["Small", "Medium", "Large", "One meter long"];
  $("#total-form").append($("<div id='result'>"))
  for (var i in size) {
    if (order.totalAmount(size[i]) != 0) {
      $("#result").append("<p>" + size[i] + " size: " + order.totalAmount(size[i]) + "</p>");
    }
  }
  $("#result").append("<h4>Total cost: $" + order.totalCost() + "</h4>")
                  .append("<h4>Thank you for your order, " + order.customer + "!</h4>")
                  .append("<br>")
                  .append('<button type="submit" class="btn btn-danger" id="new-order">New order</button>');
  $("#total-form").append($("</div>"));
}

$(document).ready(function() {
  var order;
  $(".name-form").submit(function(event) {
    event.preventDefault();
      order = new Order($("#customer").val());
      $('#name-block').hide();
      $('.instructions').show();
      $('#ingredients-block').show();
      $('#result-block').show();
  });

  $("#ingredients-back").click(function() {
    $('#ingredients-block').hide();
    $('#result-block').hide();
    $('#name-block').show();
  });

  $("#ingredients-submit").click(function() {
    var pizza = new Pizza;
    pizza.pizzaSize = $("#pizza-size").val();
    pizza.toppings = $("#pizza-topping").val();
    pizza.cheeses = $("#pizza-cheese").val();
    pizza.salads = $("#pizza-salad").val();
    order.pizzas.push(pizza);
    $("#result").remove();
    fillOrderForm(order);
    $("#order-submit").show();
  });

  $("#order-submit").click(function() {
    if (order.totalCost() != -0.01) {
      $("#result").remove();
      fillTotalCostForm(order);
      $("#order-submit").hide();
    }
    $("#new-order").click(function() {
      location.reload();
    });
  });

});
