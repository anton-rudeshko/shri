var logToDocument = true;

/**
 * Получить текущий год
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

function log(msg) {
  if (console && console.log) {
    console.log(msg);
  }
  if (logToDocument) {
    document.write(msg + "<br/>")
  }
}

function assertEquals(o1, o2) {
  log("Asserting: '" + o1 + "' == '" + o2 + "'");
  if (typeof o1 == "string" && typeof o2 == "string" && o1 != o2) {
    log("Assertion failed. Strings is not equal: '" + o1 + "' and '" + o2 + "'");
    throw "Assertion failed. Strings is not equal: '" + o1 + "' and '" + o2 + "'";
  }
}

/**
 * Создает экземпляр Машины
 * Если конструктор вызывается без указания года, то подставится текущий
 * @this {Car}
 * @param {String} manufacturer Производитель
 * @param {String} model Модель
 * @param {Number} year Год производства
 */
function Car(manufacturer, model, year) {
  this.manufacturer = manufacturer;
  this.model = model;
  this.year = year || getCurrentYear();
}

Car.prototype = {
  toString: function () {
    return this.getInfo();
  },
  getInfo: function () {
    return this.manufacturer + ' ' + this.model + ' ' + this.year;
  },
  getDetailedInfo: function () {
    return 'Производитель: ' + this.manufacturer + '. Модель: ' + this.model + '. Год: ' + this.year;
  }
};

var bmw = new Car("BMW", "X5", 2010),
  audi = new Car("Audi", "Q5", 2012),
  toyota = new Car("Toyota", "Camry");

/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {String} name Название автосалона
 */
function CarDealer(name) {
  this.name = name;
  this.cars = [];
}

CarDealer.prototype = {
  /**
   * Метод добавления машин в автосалон. Можно добавить произвольное число машин.
   */
  add: function () {
    var i;
    for (i = 0; i < arguments.length; ++i) {
      this.cars.push(arguments[i]);
    }
    return this;
  },
  /**
   * Установить цену на машину
   * @param {string} car идентификатор машины
   * @param {string} price стоимость
   */
  setPrice: function (car, price) {
    var i;
    for (i = 0; i < this.cars.length; ++i) {
      if (this.cars[i].getInfo() == car) {
        this.cars[i].price = price;
      }
    }
    return this;
  },
  list: function () {
    return this.cars.join(', ');
  },
  /**
   * Вывод списка автомобилей в продаже, с фильтрацией по стране производителю
   * @param country
   */
  listByCountry: function (country) {
    var i, result = [];
    for (i = 0; i < this.cars.length; ++i) {
      if (getCountry.call(this.cars[i]) == country) {
        result.push(this.cars[i].toString());
      }
    }
    return result.join(', ');
  },
  listWithPrice: function () {
    var i, car, price, result = [];
    for (i = 0; i < this.cars.length; ++i) {
      car = this.cars[i];
      price = car.price ? " (" + car.price + ")" : "";
      result.push(car.toString() + price);
    }
    return result.join(', ');
  }
};

var yandex = new CarDealer('Яндекс.Авто');

yandex
  .add(toyota)
  .add(bmw, audi);

yandex
  .setPrice('BMW X5 2010', '€2000')
  .setPrice('Audi Q5 2012', '€3000')
  .setPrice('Toyota Camry 2012', '¥3000');

function getCountry() {
  switch (this.manufacturer.toLowerCase()) {
    case 'bmw':
    case 'audi':
      return 'Germany';
    case 'toyota':
      return 'Japan';
  }
  return 'unknown';
}

assertEquals('Car: ' + bmw, 'Car: BMW X5 2010');
assertEquals(bmw.getInfo(), 'BMW X5 2010');
assertEquals(bmw.getDetailedInfo(), 'Производитель: BMW. Модель: X5. Год: 2010');
assertEquals(toyota.getInfo(), 'Toyota Camry 2012');

assertEquals(yandex.list(), 'Toyota Camry 2012, BMW X5 2010, Audi Q5 2012');
assertEquals(yandex.listByCountry('Germany'), 'BMW X5 2010, Audi Q5 2012');
assertEquals(yandex.listWithPrice(), 'Toyota Camry 2012 (¥3000), BMW X5 2010 (€2000), Audi Q5 2012 (€3000)');

log("Assertions passed.");