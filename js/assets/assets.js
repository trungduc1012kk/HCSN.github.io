class AssetPage {
  constructor() {
    let me = this;

    me.initEvent();

    me.initFormDetail();

    me.pagination(pageNumber);

    me.formatInput();
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
   * hàm khởi tạo sự kiện cho Page Number
   * Author: TTDuc (02/08/2022)
   */
  initEventPaging() {
    let me = this;

    //click vào paging__number
    $(".paging .paging__number").off("click");
    $(".paging .paging__number").on("click", function () {
      pageNumber = parseInt($(this).text());
      me.pagination(pageNumber);
      console.log(pageNumber);
    });

    //click prev
    $(".paging .paging__prev").off("click");
    $(".paging .paging__prev").on("click", function () {
      if (pageNumber > 1) {
        pageNumber--;
      }
      console.log(pageNumber);
      me.pagination(pageNumber);
    });

    //click next
    $(".paging .paging__next").off("click");
    $(".paging .paging__next").on("click", function () {
      if (pageNumber < maxPageNumber) {
        pageNumber++;
      }
      console.log(pageNumber);
      me.pagination(pageNumber);
    });
  }

  /**
   * render Paging
   * Author: TTDuc(02/08/2022)
   */
  pagination(pageNumber) {
    let me = this;

    //xóa tất cả phần tử con của paging
    $(".paging").empty();
    //render button prev
    $(".paging").append(`<div class="paging__item paging__prev">
                        <div class="icon">
                          <div class="icon-prev"></div>
                        </div>
                      </div>`);

    //render page 1
    $(".paging").append(`<div class="paging__item paging__number">1</div>`);

    //render more page button
    if (pageNumber > 4) {
      $(".paging").append(`<div class="paging__more1">...</div>`);
    }

    //render trang hiện tại và 2 trang liền kề
    if (pageNumber > 4 && pageNumber < maxPageNumber - 3) {
      $(".paging").append(`
                            <div class="paging__item paging__number">${
                              pageNumber - 1
                            }</div>
                            <div class="paging__item paging__number active">${pageNumber}</div>
                            <div class="paging__item paging__number">${
                              pageNumber + 1
                            }</div>`);
    } else if (pageNumber <= 4) {
      $(".paging").append(`
                            <div class="paging__item paging__number">2</div>
                            <div class="paging__item paging__number">3</div>
                            <div class="paging__item paging__number">4</div>`);
    } else if (pageNumber >= maxPageNumber - 3) {
      $(".paging").append(`
                            <div class="paging__item paging__number">${
                              maxPageNumber - 3
                            }</div>
                            <div class="paging__item paging__number">${
                              maxPageNumber - 2
                            }</div>
                            <div class="paging__item paging__number">${
                              maxPageNumber - 1
                            }</div>`);
    }

    //render more page button
    if (pageNumber < maxPageNumber - 3) {
      $(".paging").append(`<div class="paging__more1">...</div>`);
    }

    //render max page
    $(".paging").append(
      `<div class="paging__item paging__number">${maxPageNumber}</div>`
    );

    //render button next
    $(".paging").append(`<div class="paging__item paging__next">
                        <div class="icon">
                          <div class="icon-next"></div>
                        </div>
                      </div>`);

    //xóa class active cũ
    $(".paging .active").removeClass("active");
    //thêm class active vào page hiện tại
    $(".paging")
      .find(".paging__number")
      .each(function () {
        if ($(this).text() == pageNumber) {
          $(this).addClass("active");
        }
      });

    me.initEventPaging();
  }

  /**
   * hàm khởi tạo sự kiện cho input-number
   * Author: TTDuc (01/08/2022)
   */
  initEventInputNumber() {
    let me = this;

    //click up tăng 1
    $(".input-number .up-down .up").off("click");
    $(".input-number .up-down .up").on("click", function () {
      let inputVal = $(this).parents(".input-number").find("input").val();

      inputVal = Number.parseFloat(inputVal) + 1;

      $(this).parents(".input-number").find("input").val(inputVal);
    });

    //click down giảm 1
    $(".input-number .up-down .down").off("click");
    $(".input-number .up-down .down").on("click", function () {
      let inputVal = $(this).parents(".input-number").find("input").val();

      inputVal = Number.parseFloat(inputVal) - 1;

      $(this).parents(".input-number").find("input").val(inputVal);
    });
  }

  /**
   * hàm khởi tạo sự kiện cho navbar
   * Author: TTDuc(31/07/2022)
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
      //xét giá trị cho combobox
      $(this).parents(".combobox").find(".input").val(val);
      //xóa class active trước đó
      $(this).parents(".drop-down").find(".active").removeClass("active");
      //thêm class active cho item được chọn
      $(this).addClass("active");
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

    //sự kiện click chuột phải
    me.showContextMenu();

    //sự kiện ẩn contextmenu
    me.hideContextMenu();
  }

  /**
   * sự kiện ẩn contextmenu
   * Author: TTDuc(01/08/2022)
   */
  hideContextMenu() {
    $("#contextMenu .overplay").off("click");
    $("#contextMenu .overplay").on("click", function () {
      $("#contextMenu").hide();
    });
  }

  /**
   * sự kiện click chuột phải vào table
   * Author: TTDuc(01/8/2022)
   */
  showContextMenu() {
    $("table tbody tr").off("contextmenu");
    $("table tbody tr").on("contextmenu", function () {
      event.preventDefault();
      let x = event.clientX,
        y = event.clientY;
      $("#contextMenu .drop-down").css({
        top: y,
        left: x,
      });
      console.log(x + y);
      $("#contextMenu").show();
    });
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
      else {
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
    $("#table tbody tr").on("click" || "contextmenu", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).find(".td-checkbox input").prop("checked", false);
        $(".th-checkbox input").prop("checked", false);
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

  /**
   * hàm xóa TS
   * Author : TTDuc(04/08/2022)
   */
  delete(element) {
    let me = this,
      item = 0;
    $("#table tbody")
      .find(".active")
      .each(function () {
        item++;
      });
    if (item == 0) {
    } else if (item == 1) {
      let msg = "bạn có muốn xóa item này";

      $("#form-confirm .form-confirm__text").text(msg);

      $("#form-confirm").show();
    } else {
      let msg = item + " tài sản được chọn. bạn có muốn xóa không?";

      $("#form-confirm .form-confirm__text").text(msg);

      $("#form-confirm").show();
    }
    me.deleted();
  }

  /**
   * hàm xóa thành công
   * Author: TTDuc(05/08/2022)
   */
  deleted() {
    $("#form-confirm .form-confirm__control .button__save").on("click");
    $("#form-confirm .form-confirm__control .button__save").on(
      "click",
      function () {
        console.log(1);
        $("#form-notice").show();
        $("#form-confirm").hide();

        setTimeout(function () {
          $("#form-notice").hide();
        }, 2000);
      }
    );
  }
  /**
   * hàm định dạng text
   * Author: TTDuc(01/08/2022)
   */
  formatInput() {
    $("[dataType=number]").each(function () {
      $(this).addClass("text-right");
    });
  }
}

//tạo 1 biến cho trang Assets
var maxPageNumber = 15;
var pageNumber = 1;

var assetPage = new AssetPage();
