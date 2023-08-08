/******************************************
    Version: 1.0
/****************************************** */

(function ($) {
  "use strict";

  /* ==============================================
    Fixed menu
    =============================================== */

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".header_style_01").addClass("fixed-menu");
    } else {
      $(".header_style_01").removeClass("fixed-menu");
    }
  });

  /* ==============================================
		Scroll to top  
	============================================== */

  if ($("#scroll-to-top").length) {
    var scrollTrigger = 100, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#scroll-to-top").addClass("show");
        } else {
          $("#scroll-to-top").removeClass("show");
        }
      };
    backToTop();
    $(window).on("scroll", function () {
      backToTop();
    });
    $("#scroll-to-top").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }

  /* ==============================================
       LOADER -->
        =============================================== */

  $(window).load(function () {
    $("#preloader").on(500).fadeOut();
    $(".preloader").on(600).fadeOut("slow");
  });

  /* ==============================================
     FUN FACTS -->
     =============================================== */

  function count($this) {
    var current = parseInt($this.html(), 30);
    current = current + 50; /* Where 50 is increment */
    $this.html(++current);
    if (current > $this.data("count")) {
      $this.html($this.data("count"));
    } else {
      setTimeout(function () {
        count($this);
      }, 30);
    }
  }
  $(".stat_count, .stat_count_download").each(function () {
    $(this).data("count", parseInt($(this).html(), 10));
    $(this).html("0");
    count($(this));
  });

  /* ==============================================
     FUN FACTS -->
     =============================================== */

  $(".slider-wrapper").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,
    loop: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 1000,
  });

  /* ==============================================
     TOOLTIP -->
     =============================================== */
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  /* ==============================================
     CONTACT -->
     =============================================== */
  jQuery(document).ready(function () {
    $("#contactform").submit(function () {
      var action = $(this).attr("action");
      $("#pnumber").slideUp(750, function () {
        $("#pnumber").hide();
        $("#submit")
          .after('<img src="images/ajax-loader.gif" class="loader" />')
          .attr("disabled", "disabled");
        $.post(
          action,
          {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            select_service: $("#select_service").val(),
            select_price: $("#select_price").val(),
            comments: $("#comments").val(),
            verify: $("#verify").val(),
          },
          function (data) {
            document.getElementById("pnumber").innerHTML = data;
            $("#pnumber").slideDown("slow");
            $("#contactform img.loader").fadeOut("slow", function () {
              $(this).remove();
            });
            $("#submit").removeAttr("disabled");
            if (data.match("success") != null)
              $("#contactform").slideUp("slow");
          }
        );
      });
      return false;
    });
  });

  /* ==============================================
     CODE WRAPPER -->
     =============================================== */

  $(".code-wrapper").on("mousemove", function (e) {
    var offsets = $(this).offset();
    var fullWidth = $(this).width();
    var mouseX = e.pageX - offsets.left;

    if (mouseX < 0) {
      mouseX = 0;
    } else if (mouseX > fullWidth) {
      mouseX = fullWidth;
    }

    $(this).parent().find(".divider-bar").css({
      left: mouseX,
      transition: "none",
    });
    $(this)
      .find(".design-wrapper")
      .css({
        transform: "translateX(" + mouseX + "px)",
        transition: "none",
      });
    $(this)
      .find(".design-image")
      .css({
        transform: "translateX(" + -1 * mouseX + "px)",
        transition: "none",
      });
  });
  $(".divider-wrapper").on("mouseleave", function () {
    $(this).parent().find(".divider-bar").css({
      left: "50%",
      transition: "all .3s",
    });
    $(this).find(".design-wrapper").css({
      transform: "translateX(50%)",
      transition: "all .3s",
    });
    $(this).find(".design-image").css({
      transform: "translateX(-50%)",
      transition: "all .3s",
    });
  });
})(jQuery);

// Check for valid email syntax
function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function closeForm() {
  document.contactform.name.value = "";
  document.contactform.email.value = "";
  document.contactform.pnumber.value = "";

  $(".email").removeClass("typing");
  $(".name").removeClass("typing");
  $(".pnumber").removeClass("typing");

  $(".cd-popup").removeClass("is-visible");
  $(".notification").addClass("is-visible");
  $("#notification-text").html("Thanks for contacting us!");
}

$(document).ready(function ($) {
  /* ------------------------- */
  /* Contact Form Interactions */
  /* ------------------------- */
  $("#contact").on("click", function (event) {
    event.preventDefault();

    $(".contact").addClass("is-visible");
  });

  //close popup when clicking x or off popup
  $(".cd-popup").on("click", function (event) {
    if (
      $(event.target).is(".cd-popup-close") ||
      $(event.target).is(".cd-popup")
    ) {
      event.preventDefault();
      $(this).removeClass("is-visible");
    }
  });

  //close popup when clicking the esc keyboard button
  $(document).keyup(function (event) {
    if (event.which == "27") {
      $(".cd-popup").removeClass("is-visible");
    }
  });

  /* ------------------- */
  /* Contact Form Labels */
  /* ------------------- */
  $("#name").keyup(function () {
    $(".name").addClass("typing");
    if ($(this).val().length == 0) {
      $(".name").removeClass("typing");
    }
  });
  $("#email").keyup(function () {
    $(".email").addClass("typing");
    if ($(this).val().length == 0) {
      $(".email").removeClass("typing");
    }
  });
  $("#pnumber").keyup(function () {
    $(".pnumber").addClass("typing");
    if ($(this).val().length == 0) {
      $(".pnumber").removeClass("typing");
    }
  });

  /* ----------------- */
  /* Handle submission */
  /* ----------------- */
  $("#contactform").submit(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var pnumber = $("#pnumber").val();
    var human = $("#human:checked").val();

    if (human) {
      if (validateEmail(email)) {
        if (name) {
          if (pnumber) {
            // Handle submitting data somewhere
            // For a tutorial on submitting the form to a Google Spreadsheet, see:
            // https://notnaturaltutorials.wordpress.com/2016/03/20/submit-form-to-spreadsheet/

            /*
              var googleFormsURL = "https://docs.google.com/forms/d/1dHaFG67d7wwatDtiVNOL98R-FwW1rwdDwdFqqKJggBM3nFB4/formResponse";
              // replace these example entry numbers
              var spreadsheetFields = {
                "entry.212312005": name,
                "entry.1226278897": email,
                "entry.1835345325": pnumber
              }
              $.ajax({
                url: googleFormsURL,
                data: spreadsheetFields,
                type: "POST",
                dataType: "xml",
                statusCode: {
                  0: function() {
  
                  },
                  200: function() {
  
                  }
                }
              });
  */

            closeForm();
          } else {
            $("#notification-text").html(
              "<strong>Please let us know what you're thinking!</strong>"
            );
            $(".notification").addClass("is-visible");
          }
        } else {
          $("#notification-text").html(
            "<strong>Please provide a name.</strong>"
          );
          $(".notification").addClass("is-visible");
        }
      } else {
        $("#notification-text").html(
          "<strong>Please use a valid email address.</strong>"
        );
        $(".notification").addClass("is-visible");
      }
    } else {
      $("#notification-text").html(
        "<h3><strong><em>Warning: Please prove you are a human and not a robot.</em></strong></h3>"
      );
      $(".notification").addClass("is-visible");
    }

    return false;
  });
});

function laptopCheck() {
  if (document.getElementById("f-option").checked) {
    document.getElementById("desktop").style.display = "block";
    document.getElementById("laptop").style.display = "none";
  } else if (document.getElementById("s-option").checked) {
    document.getElementById("laptop").style.display = "block";
    document.getElementById("desktop").style.display = "none";
  }
}
