class FormDetail {
  constructor() {
    let me = this;

    me.initEvent();
  }

  /**
   * khởi tạo sự kiện cho trang
   * Author: TTDuc (31/07/2022)
   */
  initEvent() {
    let me = this;
    //sự kiện combobox
    me.initEventCombobox();
    //sự kiện blur input
    me.initEventBlur();
  }

  /**
   * sự kiện cho combobox
   * Author: TTDuc(04/08/2022)
   */
  initEventCombobox() {
    $(".combobox .drop-down .drop-down__item").off("click");
    $(".combobox .drop-down .drop-down__item").on("click", function () {
      let code = $(this).find(".drop-down__code").text();
      let name = $(this).find(".drop-down__name").text();
      //xét giá trị cho combobox
      $(this).parents(".combobox").find(".input").val(code);
      //xóa class active trước đó
      $(this).parents(".drop-down").find(".active").removeClass("active");
      //thêm class active cho item được chọn
      $(this).addClass("active");

      let fieldName = $(this)
        .parents(".combobox")
        .find(".input")
        .attr("fieldName");
      console.log(name);
      console.log(
        $("#form-detail").find(`[${fieldName.slice(0, -4) + "Name"}]`)
      );

      $("#form-detail")
        .find(`[fieldName=${fieldName.slice(0, -4) + "Name"}]`)
        .val(name);
    });
  }

  /**
   * event Blur cho input
   * Author: TTDuc(04/08/2022)
   */
  initEventBlur() {
    let me = this;
    $("#form-detail .row .input").blur(function () {
      me.validateInput($(this));
    });
  }

  /**
   * hàm validate cho form
   * Author:TTDuc(04/08/2022)
   */
  validateInput(element) {
    let me = this,
      isValid = me.validateRequired(element); //validate trường bắt buộc nhập

    //validate các trường số number
    if (isValid) {
      isValid = me.validateNumber(element);
    }

    //validate ngày tháng

    //validate độ dài

    //validate
  }

  /**
   * validate Number
   * Author: TTDuc(04/08/2022)
   */
  validateNumber(element) {
    let reg = /^-?\d*\.?\d*$/;
    let isValid = true;
    if (element.attr("dataType") == "number") {
      if (!reg.test(element.val())) {
        console.log(1);
        element.parents(".row").find(".err-text").remove();
        element
          .parents(".row")
          .append(`<p class="err-text">Vui lòng nhập đúng định dạng số</p>`);
        element.css("border-color", "#e03232");
        isValid = false;
      } else {
        element.parents(".row").find(".err-text").remove();
        element.css("border-color", "#ccc");
      }
    }
    return isValid;
  }

  /**
   * hàm khởi validate trường bắt buộc nhập
   * Author: TTDuc(04/08/2022)
   */
  validateRequired(element) {
    let isValid = true;
    if (!element.val()) {
      console.log(1);
      element.parents(".row").find(".err-text").remove();
      element
        .parents(".row")
        .append(`<p class="err-text">Bắt buộc nhập trường này</p>`);
      element.css("border-color", "#e03232");
      isValid = false;
    } else {
      element.parents(".row").find(".err-text").remove();
      element.css("border-color", "#ccc");
    }
    return isValid;
  }

  /**
   * hàm mở formDetail
   * Author: TTDuc(31/07/2022)
   */
  open() {
    let newCode = "TS12345";
    $("#form-detail").show();
    $("#AssetsCode").focus();
    $("#AssetsCode").val(newCode);
    $("[fieldName=YearFollow]").val($("#yearfolow").val());
  }
}
