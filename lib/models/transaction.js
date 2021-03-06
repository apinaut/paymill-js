/**
 *
 * Creates a new Transaction. Generally you should never create a PAYMILL object on your own.
 * @class Transaction
 * @classdesc A transaction is the charging of a credit card or a direct debit. In this case you need a new transaction object with either a valid token, payment, client + payment or preauthorization. Every transaction has a unique identifier which will be generated by Paymill to identify every transaction. You can issue/create, list and display transactions in detail. Refunds can be done in an extra entity.
 */

function Transaction() {

}

Transaction.prototype = new PaymillObject();
Transaction.prototype.constructor = Transaction;

/**
 * Unique identifier for this transaction.
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.id = null;

/**
 * Formatted amount of this transaction
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.amount = null;

/**
 * The used amount, smallest possible unit per currency (for euro, we’re calculating the amount in cents).
 * @type {number}
 * @memberof Transaction.prototype
 */
Transaction.prototype.origin_amount = null;

/**
 * ISO 4217 formatted currency code.
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.currency = null;

/**
 * Indicates the current status of this transaction, e.g closed means the transaction is sucessfully transfered, refunded means that the amount is fully or in parts refunded.
 * ISO 4217 formatted currency code.
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.status = null;
/**
 * Need a additional description for this transaction? Maybe your shopping cart ID or something like that?
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.description = null;
/**
 * Whether this transaction was issued while being in live mode or not.
 * @type {boolean}
 * @memberof Transaction.prototype
 */
Transaction.prototype.livemode = null;
/**
 * List of refunds.
 * @type {Array.<Refund>}
 * @memberof Transaction.prototype
 */
Transaction.prototype.refunds = null;

/**
 * Corresponding payment object.
 * @type {Payment}
 * @memberof Transaction.prototype
 */
Transaction.prototype.payment = null;

/**
 * Corresponding Client object.
 * @type {Client}
 * @memberof Transaction.prototype
 */
Transaction.prototype.client = null;

/**
 * Corresponding Preauthorization object.
 * @type {Preauthorization}
 * @memberof Transaction.prototype
 */
Transaction.prototype.preauthorization = null;

/**
 * Unix-Timestamp for the creation date.
 * @type {Date}
 * @memberof Transaction.prototype
 */
Transaction.prototype.created_at = null;
/**
 * Unix-Timestamp for the last update.
 * @type {Date}
 * @memberof Transaction.prototype
 */
Transaction.prototype.updated_at = null;

/**
 * Response code
 * @type {number}
 * @memberof Transaction.prototype
 */
Transaction.prototype.response_code = null;
/**
 * Unique identifier of this transaction provided to the acquirer for the statements.
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.short_id = null;

/**
 * PAYMILL invoice where the transaction fees are charged or null.
 * @type {Array.<string>}
 * @memberof Transaction.prototype
 */
Transaction.prototype.invoices = null;
/**
 * App fees
 * @type {Array.<Fee>}
 * @memberof Transaction.prototype
 */
Transaction.prototype.fees = null;

/**
 * App (ID) that created this transaction or null if created by yourself.
 * @type {string}
 * @memberof Transaction.prototype
 */
Transaction.prototype.app_id = null;

/**
 * Status of a Transaction.
 * @memberof Transaction
 * @property {string} OPEN
 * @property {string} PENDING
 * @property {string} CLOSED
 * @property {string} FAILED
 * @property {string} PARTIAL_REFUNDED
 * @property {string} REFUNDED
 * @property {string} PREAUTHORIZE
 */
Transaction.Status = {
	"OPEN" : "open",
	"PENDING" : "pending",
	"CLOSED" : "closed",
	"FAILED" : "failed",
	"PARTIAL_REFUNDED" : "partial_refunded",
	"REFUNDED" : "refunded",
	"PREAUTHORIZE" : "preauthorize",
	"PREAUTH" : "preauth"
};
Transaction.prototype.getFieldDefinitions = function() {
	return {
		created_at : deserializeDate,
		updated_at : deserializeDate,
		fees : function(json) {
			return deserializePaymillObjectList(json, Fee);
		},
		client : function(json) {
			return deserializePaymillObject(json, Client);
		},
		payment : function(json) {
			return deserializePaymillObject(json, Payment);
		},
		preauthorization : function(json) {
			return deserializePaymillObject(json, Preauthorization);
		},
		refunds : function(json) {
			return deserializePaymillObjectList(json, Refund);
		},
	};
};
Transaction.prototype.getUpdateableFields = function() {
	return ["description"];
};
/**
 * Specify an order for transactions.
 * @class Transaction.Order
 * @memberof Transaction
 * @extends Order
 */
Transaction.Order = function() {
	Order.call(this);
};
Transaction.Order.prototype = new Order();
Transaction.Order.constructor = Transaction.Order;

/**
 * @returns {Order} order by created_at
 * @memberof Transaction.Order
 */
Transaction.Order.created_at = function() {
	var order = new Transaction.Order();
	order.type = "created_at";
	return order;
};
/**
 * Specify a filter for clients.
 * @class Transaction.Filter
 * @memberof Transaction
 * @extends Filter
 */

Transaction.Filter = function() {
	Filter.call(this);
};
Transaction.Filter.prototype = new Filter();
Transaction.Filter.constructor = Transaction.Filter;

/**
 * Add filtering by payment
 * @param {(string|Client)} client the client object or its id.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.client = function(client) {
	this.client = getIdFromObject(client);
	return this;
};
/**
 * Add filtering by payment
 * @param {(string|Payment)} payment the payment object or its id.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.payment = function(payment) {
	this.payment = getIdFromObject(payment);
	return this;
};
/**
 * Add filtering by amount. e.g. “300” or “>300” or “<300”
 * @param {(string|number)} amount the target amount
 * @param {(string|Filter.EQUALITY)} equality equality for the filter. If none is specified EQUAL is used.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.amount = function(amount, equality) {
	var realEquality = equality;
	if (equality === undefined) {
		realEquality = Filter.EQUALITY.EQUAL;
	}
	this.amount = realEquality + amount;
	return this;
};
/**
 * Add filtering by description
 * @param {string} description the description
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.description = function(description) {
	this.description = description;
	return this;
};

/**
 * Add filtering by created_at
 * @param {(number|Date)} from the start date of the filter, either as Date or Unix-time number.
 * @param {(number|Date)} to the end date of the filter, either as Date or Unix-time number.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.created_at = function(from, to) {
	var realFrom = getTimeFromObject(from);
	var realTo = getTimeFromObject(to);
	this.created_at = realFrom + "-" + realTo;
	return this;
};
/**
 * Add filtering by updated_at
 * @param {(number|Date)} from the start date of the filter, either as Date or Unix-time number.
 * @param {(number|Date)} to the end date of the filter, either as Date or Unix-time number.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.updated_at = function(from, to) {
	var realFrom = getTimeFromObject(from);
	var realTo = getTimeFromObject(to);
	this.updated_at = realFrom + "-" + realTo;
	return this;
};

/**
 * Add filtering by status
 * @param {(string|Transaction.Status)} status the status to be filtered.
 * @returns {Filter} the same filter.
 * @memberof Transaction.Filter
 */
Transaction.Filter.prototype.status = function(status) {
	if (!__.isString) {
		throw new PMError(PMError.Type.WRONG_PARAMS, "status must be a string.");
	}
	this.status = status;
	return this;
};

/**
 * The {@link Transaction} object.
 */
exports.Transaction = Transaction;
