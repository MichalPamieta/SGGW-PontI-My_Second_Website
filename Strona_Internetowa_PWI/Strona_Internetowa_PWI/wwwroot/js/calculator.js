var screenInput = $("#ScreenInput");
var availableOperations = ['-', '+', '/', '*'];
var isResult = false;
var wasZero = false;

$(document).ready(function () {
    screenInput.val('0');
})

function addNumber(number) {
    var val = screenInput.val();
    if (number != '.') {
        if (val == '0' || val == '∞' || val == '-∞' || val == 'NaN' || val == '∞.' || val == '-∞.' || val == 'NaN.') {
            val = '';
            setCommaBtnAvailable(true);
        }
        screenInput.val(val + number);
        setOperationBtnsAvailable(true);
    }
    else if (number == '.') {
        if (availableOperations.includes(val.slice(-1)))
            number = '0.';
        screenInput.val(val + number);
        setCommaBtnAvailable(false);
        setOperationBtnsAvailable(false);
    }
}

function addOperation(operation) {
    screenInput.val(screenInput.val() + operation);
    setOperationBtnsAvailable(false);
    setCommaBtnAvailable(true);
}

function clearScreen() {
    screenInput.val('0');
    setOperationBtnsAvailable(true);
    setCommaBtnAvailable(true);
}

function getResult() {
    $.ajax({
        type: 'POST',
        url: $('.result-button').data('calculator-result-url'),
        data: {
            inputVal: screenInput.val()
        },
        success: function (response) {
            if (response.success) {
                var result = response.result;
                screenInput.val(result);
                if (result.includes('.'))
                    setCommaBtnAvailable(false);
                else
                    setCommaBtnAvailable(true);
            }
            else
                alert(response.message);
        },
        error: function (response) {
            alert(data.message);
        },
        dataType: "json"
    });
}

function setCommaBtnAvailable(state) {
    $('.comma').prop('disabled', !state);
}

function setOperationBtnsAvailable(state) {
    $('.operation').prop('disabled', !state);
}