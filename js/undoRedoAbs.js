var button = {
    //Methods
    click: function(theCommand) {
        theCommand.execute();
    },
    clickUndo: function(theCommand) {
        theCommand.undo();
    },
    clickRedo: function(theCommand) {
        theCommand.redo();
    },
};
function addToOrder(theReceiver, theId, theName, thePrice) {
    this.id = theId;
    this.name = theName;
    this.price = thePrice;
    this.receiver = theReceiver;
    //Methods
    this.execute = function() {
        this.receiver.addOrder(this.id, this.name, this.price);
    };
    this.undo = function() {
        this.receiver.removeOrder(this.id, this.price);
    };
    this.redo = function() {
        this.receiver.addOrder(this.id, this.name, this.price);
    };
};
function removeFromOrder(theReceiver, theId, theName, thePrice) {
    this.id = theId;
    this.name = theName;
    this.price = thePrice;
    this.receiver = theReceiver;
    //Methods
    this.execute = function() {
        this.receiver.removeOrder(this.id, this.price);
    };
    this.undo = function() {
        this.receiver.addOrder(this.id, this.name, this.price);
    };
    this.redo = function() {
        this.receiver.removeOrder(this.id, this.price);
    };
};
var undoRedoStack = {
    stack: [],
    stackPointer: 0,
    //Methods
    lastCommand: null,
    isUnder: function() {
        if (this.stackPointer < 0) {
            return true;
        }
        return false;
    },
    isOver: function() {
        if (this.stackPointer > this.stack.length-1) {
            return true;
        }
        return false
    },
    push: function(element) {
        if (this.stack.length > 4) {
            this.stack.splice(0, 1);
        }
        if (this.stack.length > this.stackPointer+1) { 
            this.stack.splice(this.stackPointer+1, this.stack.length);
        }
        this.stack.push(element);
        this.stackPointer = this.stack.length-1;
        this.lastCommand = "push";
    },
    undo: function() {
        if (this.lastCommand == "redo") {
            this.stackPointer--;
        } 
        var result = this.stack[this.stackPointer];
        this.stackPointer--;
        this.lastCommand = "undo";
        return result;
    },
    redo: function() {
        if (this.lastCommand == "undo") {
            this.stackPointer++;
        } 
        var result = this.stack[this.stackPointer];
        this.stackPointer++;
        this.lastCommand = "redo";
        return result;
    },
};
