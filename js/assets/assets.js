class AssetPage {
  constructor() {
    let me = this;

    me.initEvent();

    me.initFormDetail();
  }

  /**
   * hàm khởi tạo các sự kiện cho page
   * Author: TTDuc (31/07/2022)
   */
  initEvent() {
    let me = this;
    //các sự kiện điều khiển trên trang
    me.initEventControler();

    //sự kiện cho table
    me.initEventTable();

    //combobox Event
    me.initEventCombobox();

    //sự kiện navbar
    me.initEventNavbar();

    //sự kiện tăng giảm ở input-number
    me.initEventInputNumber();
  }

  /**
   * hàm khởi tạo sự kiện cho input-number
   * Author: TTDuc (01/08/2022)
   */
  initEventInputNumber(){
    let me = this;

    //click up tăng 1
    $('.input-number .up-down .up').off("click");
    $('.input-number .up-down .up').on("click", function(){
        let inputVal = $(this).parents(".input-number").find("input").val();

        inputVal = Number.parseFloat(inputVal) + 1;

        $(this).parents(".input-number").find("input").val(inputVal);
    });


    //click down giảm 1
    $('.input-number .up-down .down').off("click");
    $('.input-number .up-down .down').on("click", function(){
        let inputVal = $(this).parents(".input-number").find("input").val();

        inputVal = Number.parseFloat(inputVal) - 1;

        $(this).parents(".input-number").find("input").val(inputVal);
    });

  }


  /**
   * hàm khởi tạo sự kiện cho navbar
   */
  initEventNavbar() {
    let me = this;
    //sự kiện click item

    //sự kiện phóng to thu nhỏ navbar
    me.zoomNavbar();
  }

  /**
   * sự kiện phóng to thu nhỏ navbar
   * Author: TTDuc(31/07/2022)
   */
  zoomNavbar() {
    $("#zoom").off("click");
    $("#zoom").on("click", function () {
      if ($(this).hasClass("zoom-in")) {
        //kiểm tra xem có class zoom-in thì thu nhỏ
        $(this).find(".btn__icon div").removeClass("icon-left");
        $(this).find(".btn__icon div").addClass("icon-right");
        $(this).removeClass("zoom-in");
        $(this).addClass("zoom-out");
        $(".container").css("grid-template-columns", "66px calc(100% - 66px)");
      } else {
        // ngược lại thì phóng to
        $(this).find(".btn__icon div").removeClass("icon-right");
        $(this).find(".btn__icon div").addClass("icon-left");
        $(this).removeClass("zoom-out");
        $(this).addClass("zoom-in");
        $(".container").css("grid-template-columns", "1fr 5fr");
      }

      $(".nav-item__text").toggle();
      $(".brand__text").toggle();
    });
  }

  /**
   * khởi tạo sự kiện cho Combobox
   * Author: TTDuc(31/07/2022)
   */
  initEventCombobox() {
    let me = this;

    //sự kiện mở combobox
    me.openCombobox();

    //sự kiện chọn item
    me.selectCombobox();
  }

  /**
   * hàm mở combobox
   * Author: TTDuc(31/07/2022)
   */
  openCombobox() {
    $(".combobox").off("click");
    $(".combobox").on("click", function () {
      $(this).find(".drop-down").toggle();
    });
  }

  /**
   * hàm bắt sự kiện click item combobox
   * Author: TTDuc(31/07/2022)
   */
  selectCombobox() {
    $(".combobox .drop-down .drop-down__item").off("click");
    $(".combobox .drop-down .drop-down__item").on("click", function () {
      let val = $(this).text();
      //xóa class active trước đó
      $(this).parents(".drop-down").find(".active").removeClass("active");
      //thêm class active cho item được chọn
      $(this).addClass("active");
      //xét giá trị cho combobox
      $(this).parents(".combobox").find(".input").val(val);
    });
  }

  /**
   * hàm khởi tọa sự kiện cho Table
   * Author: TTDuc (31/7/2022)
   */
  initEventTable() {
    let me = this;

    //sự kiện click item
    me.selectedItemTable();

    //sự kiện chọn tất cả item
    me.selectedAllItemTable();
  }

  /**
   * hàm khởi tạo sự kiện chọn tất cả item trong table
   * Author: TTDuc(01/08/2022)
   */
  selectedAllItemTable() {
    $(".th-checkbox input").off("click");
    $(".th-checkbox input").on("click", function () {

        // input ở th được chọn thì chọn tất cả
        if ($(this).prop("checked") == true) {
        $("tbody")
          .find(" .td-checkbox input")
          .each(function () {
            $(this).prop("checked", true);
            $(this).parents("tr").addClass("active");
          });
      }
      // ngược lại thì hủy chọn tất cả 
      else{
        $(this).prop("checked", false);
        $("tbody")
          .find(" .td-checkbox input")
          .each(function () {
            $(this).prop("checked", false);
            $(this).parents("tr").removeClass("active");
          });
      }
    });
  }

  /**
   * hàm sự kiện click item table
   * Author: TTDuc(31/07/2022)
   */
  selectedItemTable() {
    let me = this;

    $("#table tbody tr").off("click");
    $("#table tbody tr").on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).find(".td-checkbox input").prop("checked", false);
        $(".th-checkbox input").prop("checked", false)
      } else {
        $(this).find(".td-checkbox input").prop("checked", true);
        $(this).addClass("active");
      }
    });
  }

  /**
   * hàm khởi tạo formDetail
   * Author: TTDuc(31/07/2022)
   */
  initFormDetail() {
    let me = this;

    me.formDetail = new FormDetail();
  }

  /**
   * hàm khởi tạo sự kiện điều khiển cho trang
   * Author: TTDuc (31/07/2022)
   */
  initEventControler() {
    let me = this;
    $("[commandType]").off("click");
    $("[commandType]").on("click", function () {
      let commandType = $(this).attr("commandType");
      console.log(commandType);
      if (me[commandType] && typeof me[commandType] == "function") {
        me[commandType]($(this));
      }
    });
  }

  /**
   * hàm khởi tạo sự kiện thêm mới
   * Author: TTDuc (31/07/2022)
   */
  add(emplement) {
    let me = this;
    me.formDetail.open();
  }

  /**
   * hàm đóng form
   * Author: TTDuc (31/07/2022)
   */
  close(emplement) {
    let me = this;

    emplement.parents(".popup").hide();
  }
}

//tạo 1 biến cho trang Assets
var assetPage = new AssetPage();
