// Дэлгцэтэй ажиллах контроллер
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn'
    };
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,   // exp, inc
                description: document.querySelector(DOMstrings.inputDescription).value, 
                value: document.querySelector(DOMstrings.inputValue).value                
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function(){
    // Income, Expense хадгалах байгууллагч функцыг үүсгэнэ.
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;    
    }
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;    
    };
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    // closure-тай public service
    return{
        addItem: function(type, desc, val){
            var item, id;
            // id буюу idenetification - тодорхойлдог хүчин зүйл
            if(data.items[type].length === 0 ) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1; 
            }
            if (type === 'inc'){
                item = new Income(id, desc, val);
            } else {    // type === 'exp'
            item = new Expense(id, desc, val);
            }
            data.items[type].push();
        }
       /*  seeData: function(){
            return data;
        } */
    };
})();
// Программын холбогч контроллер
var appController = (function(uiController, financeController){
    
    var ctrlAddItem = function(){
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        var input = uiController.getInput();
        console.log(input);
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        financeController.addItem(input.type, input.description, input.value);
        // 3. Олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт гаргана.
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэд гаргана.
    }
    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
        console.log('appController-ын function');
    
        document.addEventListener("keypress", function(event){
            // Дээр үеийн browser-уудад event.which-ыг ашигладаг. Орчин үеийн browser-уудад event.keyCode-ыг ашигладаг
            if(event.keyCode === 13 || event.which === 13 ) {
                ctrlAddItem();
            }
        });
    }

    return {
        init: function(){
            console.log('Application started ...');
            setupEventListeners();
        }
    }
})(uiController, financeController);

appController.init();