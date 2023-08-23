$(document).ready(function() {
    var form = $('#form_buying_goods');
    form.on('submit', function (e) {
        e.preventDefault();
        var qty = $('#number').val()*1;
        var submit_btn = $('#submit_btn');
        var product_id = submit_btn.data("product_id")*1;
        var name = submit_btn.data("name");
        console.log(product_id);
        console.log(typeof(product_id));
        console.log(name);
        console.log(qty);
        console.log(typeof(qty));

        var data = {};
        data.product_id = product_id;
        data.qty = qty;


         var csrf_token = $('#form_buying_goods [name="csrfmiddlewaretoken"]').val();
         data["csrfmiddlewaretoken"] = csrf_token;

        var url = form.attr('action');

        $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: true,
            success: function (data) {
                console.log('OK');
                console.log('here');
                console.log(data.total_products_qty);
                if(data.total_products_qty){
                $('#total_products_qty').text('тов. (' + data.total_products_qty + ')');
                console.log(data.products)
                }
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    function calcCartAmount() {
        console.log('here123');
        var total_order_amount = 0;
        $('.total-cart-amount').each(function () {
            total_order_amount = total_order_amount + parseFloat($(this).text());//нужен тип decimal
        });
        $('#total_order_amount').text(total_order_amount.toFixed(2))

        console.log(total_order_amount);
    }

    $(document).on('change', '.product-qty', function () {
        $('#total_cart_amount')
        console.log('here_now');
        var current_qty = $(this).val();
        console.log(current_qty);
        var current_tr = $(this).closest('tr');
        var current_price = parseFloat(current_tr.find('.product-price').text()).toFixed(2);//нужен тип decimal
        console.log(current_price);
        var total_amount = parseFloat(current_qty*current_price).toFixed(2);
        console.log(total_amount);
        current_tr.find('.total-cart-amount').text(total_amount);

        calcCartAmount();
    });

    calcCartAmount();
})