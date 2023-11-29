/*
Author       : Dreamguys
Template Name: HD Plus
Version      : 1.0
*/

(function ($) {
  'use strict';

  // Stick Sidebar

  if ($(window).width() > 767) {
    if ($('.theiaStickySidebar').length > 0) {
      $('.theiaStickySidebar').theiaStickySidebar({
        // Settings
        additionalMarginTop: 70,
      });
    }
  }

  // Variables declarations

  var $wrapper = $('.main-wrapper');
  var $pageWrapper = $('.page-wrapper');
  var $slimScrolls = $('.slimscroll');

  // Sidebar
  var Sidemenu = function () {
    this.$menuItem = $('#sidebar-menu a');
  };

  function init() {
    var $this = Sidemenu;
    $('#sidebar-menu a').on('click', function (e) {
      if ($(this).parent().hasClass('submenu')) {
        e.preventDefault();
      }
      if (!$(this).hasClass('subdrop')) {
        $('ul', $(this).parents('ul:first')).slideUp(350);
        $('a', $(this).parents('ul:first')).removeClass('subdrop');
        $(this).next('ul').slideDown(350);
        $(this).addClass('subdrop');
      } else if ($(this).hasClass('subdrop')) {
        $(this).removeClass('subdrop');
        $(this).next('ul').slideUp(350);
      }
    });
    $('#sidebar-menu ul li.submenu a.active')
      .parents('li:last')
      .children('a:first')
      .addClass('active')
      .trigger('click');
    $('#sidebar-menu ul li.submenu ul li.submenu a.active')
      .parents('li.submenu')
      .children('a:first')
      .addClass('supdrop')
      .trigger('click');
  }

  // Sidebar Initiate

  init();

  // Mobile menu sidebar overlay

  $('body').append('<div class="sidebar-overlay"></div>');
  $(document).on('click', '#mobile_btn', function () {
    $wrapper.toggleClass('slide-nav');
    $('.sidebar-overlay').toggleClass('opened');
    $('html').addClass('menu-opened');
    return false;
  });

  // Sidebar Overlay

  $('.sidebar-overlay').on('click', function () {
    $wrapper.removeClass('slide-nav');
    $('.sidebar-overlay').removeClass('opened');
    $('html').removeClass('menu-opened');
  });

  // Page Content Height

  if ($('.page-wrapper').length > 0) {
    var height = $(window).height();
    $('.page-wrapper').css('min-height', height);
  }

  // Page Content Height Resize

  $(window).resize(function () {
    if ($('.page-wrapper').length > 0) {
      var height = $(window).height();
      $('.page-wrapper').css('min-height', height);
    }
  });

  // Sidebar Slimscroll

  if ($slimScrolls.length > 0) {
    $slimScrolls.slimScroll({
      height: 'auto',
      width: '100%',
      position: 'right',
      size: '7px',
      color: '#ccc',
      allowPageScroll: false,
      wheelStep: 10,
      touchScrollStep: 100,
    });
    var wHeight = $(window).height() - 80;
    $slimScrolls.height(wHeight);
    $('.sidebar .slimScrollDiv').height(wHeight);
    $(window).resize(function () {
      var rHeight = $(window).height() - 80;
      $slimScrolls.height(rHeight);
      $('.sidebar .slimScrollDiv').height(rHeight);
    });
  }

  // Small Sidebar

  $(document).on('click', '#toggle_btn', function () {
    if ($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    return false;
  });

  $(document).on('mouseover', function (e) {
    e.stopPropagation();
    if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
      var targ = $(e.target).closest('.sidebar').length;
      if (targ) {
        $('body').addClass('expand-menu');
        $('.subdrop + ul').slideDown();
      } else {
        $('body').removeClass('expand-menu');
        $('.subdrop + ul').slideUp();
      }
      return false;
    }
  });

  // Date Range Picker

  if ($('.bookingrange').length > 0) {
    var start = moment().subtract(6, 'days');
    var end = moment();

    function booking_range(start, end) {
      $('.bookingrange span').html(
        start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'),
      );
    }

    $('.bookingrange').daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, 'days'),
            moment().subtract(1, 'days'),
          ],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [
            moment().subtract(1, 'month').startOf('month'),
            moment().subtract(1, 'month').endOf('month'),
          ],
        },
      },
      booking_range,
    );

    booking_range(start, end);
  }

  // Datetimepicker

  if ($('.datetimepicker').length > 0) {
    $('.datetimepicker').datetimepicker({
      format: 'DD-MM-YYYY',
      icons: {
        up: 'fas fa-angle-up',
        down: 'fas fa-angle-down',
        next: 'fas fa-angle-right',
        previous: 'fas fa-angle-left',
      },
    });
  }

  // Select 2

  if ($('.select').length > 0) {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%',
    });
  }

  // Date Range Picker

  if ($('.selected-date').length > 0) {
    var start = moment();
    // var end = moment();

    function booking_range(start) {
      $('.selected-date').html(start.format('MMMM D, YYYY'));
    }

    $('.selected-date').daterangepicker(
      {
        singleDatePicker: true,
        showDropdowns: true,
      },
      booking_range,
    );

    booking_range(start);
  }

  // Date Range Picker

  if ($('.work-date-range').length > 0) {
    var start = moment();
    var end = moment();

    function booking_range(start, end) {
      $('.selected-date').html(
        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'),
      );
    }

    $('.work-date-range').daterangepicker(
      {
        startDate: start,
        endDate: end,
      },
      booking_range,
    );

    booking_range(start, end);
  }

  // Home header

  $(window).scroll(function () {
    var sticky = $('.header'),
      scroll = $(window).scrollTop();

    if (scroll >= 10) sticky.addClass('add-header-bg');
    else sticky.removeClass('add-header-bg');
  });

  // Timepicker

  if ($('.timepicker').length > 0) {
    $('.timepicker').datetimepicker({
      format: 'HH:mm',
    });
  }

  // Datatable

  if ($('.datatable').length > 0) {
    $('.datatable').DataTable({
      bFilter: false,
      bPaginate: false,
      columnDefs: [
        {
          targets: 'no-sort',
          orderable: false,
        },
      ],
    });
  }

  // Timepicker

  if ($('.timepickers').length > 0) {
    $('.timepickers').datetimepicker({
      format: 'HH:mm',
    });
  }

  // Filter

  $('.filter-tag').click(function () {
    $('.filter-viewdetails').removeClass('d-none');
  });
  $('.filter-btn-path .btn-cancel').click(function () {
    $('.filter-viewdetails').addClass('d-none');
  });

  // Locations

  var sidebar = $('.sidebar').innerWidth();
  var window_width_rightsidebar = $(window).innerWidth() - sidebar;

  $('.openedit').click(function () {
    setTimeout(function () {
      var locations_maindiv = $('.locations-maindiv').innerWidth();
      $('.locations-edit')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - locations_maindiv)
        .css('right', 0);
    }, 50);
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-create').removeClass('active').css('right', '-450px');
  });
  $('.link-cancel').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-edit').removeClass('active').css('right', '-450px');
  });
  $('.opencreate').click(function () {
    setTimeout(function () {
      var locations_maindiv = $('.locations-maindiv').innerWidth();
      $('.locations-create')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - locations_maindiv)
        .css('right', 0);
    }, 50);
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-edit').removeClass('active').css('right', '-450px');
  });
  $('.link-cancels').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-create').removeClass('active').css('right', '-450px');
  });
  $('.opencreateset').click(function () {
    $('.locations-detailsview ').addClass('d-none');
    $('.locations-create').addClass('active');
    $('.locations-edit').removeClass('active');
  });
  $('.openeditset').click(function () {
    $('.locations-detailsview ').addClass('d-none');
    $('.locations-create').removeClass('active');
    $('.locations-edit').addClass('active');
  });
  $('.link-mainset').click(function () {
    $('.locations-detailsview').removeClass('d-none');
    $('.locations-create').removeClass('active').css('right', '-450px');
    $('.locations-edit').removeClass('active').css('right', '-450px');
  });

  $('.openeditset').click(function () {
    setTimeout(function () {
      var locations_maindiv = $('.locations-maindiv').innerWidth();
      $('.locations-edit')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - locations_maindiv)
        .css('right', 0);
    }, 50);
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-create').removeClass('active');
  });
  $('.opencreateset').click(function () {
    setTimeout(function () {
      var locations_maindiv = $('.locations-maindiv').innerWidth();
      $('.locations-create')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - locations_maindiv)
        .css('right', 0);
    }, 50);
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-edit').removeClass('active').css('right', '-450px');
  });

  // Settings Sidebar

  var sidebar = $('.sidebar').innerWidth();
  var window_width_rightsidebar = $(window).innerWidth() - sidebar;

  // Create Sidebar

  $('.create-open-link').click(function () {
    setTimeout(function () {
      var settings_table = $('.settings-table').innerWidth();
      $('.create-open-sidebar')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - settings_table)
        .css('right', 0);
    }, 50);
    $('.settings-table').removeClass('w-100');
    $('.add-open-sidebar').removeClass('active').css('right', '-450px');
    $('.edit-open-sidebar').removeClass('active').css('right', '-450px');
  });
  $('.create-close-sidebar').click(function () {
    $('.settings-table').addClass('w-100');
    $('.create-open-sidebar').removeClass('active').css('right', '-450px');
  });

  // Add Sidebar

  $('.add-open-link').click(function () {
    setTimeout(function () {
      var settings_table = $('.settings-table').innerWidth();
      $('.add-open-sidebar')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - settings_table)
        .css('right', 0);
    }, 50);
    $('.settings-table').removeClass('w-100');
    $('.create-open-sidebar').removeClass('active').css('right', '-450px');
    $('.edit-open-sidebar').removeClass('active').css('right', '-450px');
  });
  $('.add-close-sidebar').click(function () {
    $('.settings-table').addClass('w-100');
    $('.add-open-sidebar').removeClass('active').css('right', '-450px');
  });

  // Edit Sidebar

  $('.edit-open-link').click(function () {
    setTimeout(function () {
      var settings_table = $('.settings-table').innerWidth();
      $('.edit-open-sidebar')
        .addClass('active')
        .css('max-width', window_width_rightsidebar - settings_table)
        .css('right', 0);
    }, 50);
    $('.settings-table').removeClass('w-100');
    $('.add-open-sidebar').removeClass('active').css('right', '-450px');
    $('.create-open-sidebar').removeClass('active').css('right', '-450px');
  });
  $('.edit-close-sidebar').click(function () {
    $('.settings-table').addClass('w-100');
    $('.edit-open-sidebar').removeClass('active').css('right', '-450px');
  });

  // Increment or Decrement

  $('.number-btn').on('click', function () {
    var $button = $(this);
    var oldValue = $button
      .closest('.number-group')
      .find('input.number-input')
      .val();
    if ($button.text() == '+') {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.closest('.number-group').find('input.number-input').val(newVal);
  });

  // Quick Book

  $(document).on('click', '.quick-book-item', function (s) {
    s.preventDefault();
    $('.quick-book-sidebar').addClass('quick-book-sidebar-open');
    $('.sidebar-overlay').toggleClass('opened');
    $('body').addClass('menu-opened');
  });
  $(document).on('click', '.clear-book', function (s) {
    s.preventDefault();
    $('.quick-book-sidebar').removeClass('quick-book-sidebar-open');
    $('.sidebar-overlay').removeClass('opened');
    $('body').removeClass('menu-opened');
  });
  $('.sidebar-overlay').on('click', function () {
    $wrapper.removeClass('slide-nav');
    $('.sidebar-overlay').removeClass('opened');
    $('html').removeClass('menu-opened');
    $('.quick-book-sidebar').removeClass('quick-book-sidebar-open');
  });
  $(document).ready(function () {
    let progressVal = 0;
    let businessType = 0;

    $('.next_btn').click(function () {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .fadeIn('slow');
      $(this).parent().parent().parent().parent().parent().css({
        display: 'none',
      });
      progressVal = progressVal + 1;
      $('.progress-active')
        .removeClass('progress-active')
        .addClass('progress-activated')
        .next()
        .addClass('progress-active');
    });

    $('.prev_btn').click(function () {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .prev()
        .fadeIn('slow');
      $(this).parent().parent().parent().parent().parent().css({
        display: 'none',
      });
      progressVal = progressVal - 1;
      $('.progress-active')
        .removeClass('progress-active')
        .prev()
        .removeClass('progress-activated')
        .addClass('progress-active');
    });
  });

  // Notification

  $(document).on('click', '.notification-show', function () {
    $('.user-dropdown').toggleClass('active');
  });

  $(document).on('click', '.notification-hide', function () {
    $('.user-dropdown').addClass('d-none');
  });
  $(document).on('click', '.notification-hide', function () {
    $('.user-dropdown').addClass('d-none');
  });
  $(document).on('click', '.requests-show', function () {
    $('.requests-notification-card').removeClass('d-none');
    $('.requests-notification-card').addClass('d-block');
    $('.activity-notification-card').addClass('d-none');
  });
  $(document).on('click', '.back-activity-show', function () {
    $('.activity-notification-card').removeClass('d-none');
    $('.activity-notification-card').addClass('d-block');
  });
  $(document).on('click', '.edit-notification', function () {
    $('.edit-notification-card').removeClass('d-none');
    $('.edit-notification-card').addClass('d-block');
    $('.activity-notification-card').addClass('d-none');
  });

  $(document).on('click', '.requests-show', function () {
    $('.requests-notification-card').removeClass('d-none');
    $('.requests-notification-card').addClass('d-block');
    $('.activity-notification-card').addClass('d-none');
  });
  $('body').append('<div class="append-bg"></div>');

  $('.append-bg').on('click', function () {
    $('.append-bg').toggleClass('open');
    $('.user-dropdown').removeClass('active');
  });

  $('.notification-show').click(function () {
    $('.append-bg').addClass('open ');
  });

  $('.openedit').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-edit').addClass('active');
    $('.locations-create').removeClass('active');
  });
  $('.link-cancel').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-edit').removeClass('active');
  });
  $('.opencreate').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-create').addClass('active');
    $('.locations-edit').removeClass('active');
  });
  $('.link-cancels').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-create').removeClass('active');
  });

  $('.openedit').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-edit').removeClass('active');
    $('.locations-create').removeClass('active');
  });
  $('.link-cancel').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-edit').removeClass('active');
  });
  $('.opencreate').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-create').addClass('active');
    $('.locations-edit').removeClass('active');
  });
  $('.link-cancels').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-create').removeClass('active');
  });
  $('.openedit').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-edit').addClass('active');
    $('.locations-create').removeClass('active');
  });
  $('.link-cancel').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-edit').removeClass('active');
  });
  $('.opencreate').click(function () {
    $('.locations-maindiv').removeClass('w-100');
    $('.locations-create').addClass('active');
    $('.locations-edit').removeClass('active');
  });
  $('.link-cancels').click(function () {
    $('.locations-maindiv').addClass('w-100');
    $('.locations-create').removeClass('active');
  });

  // Leave Settings button show

  $(document).on('click', '.leave-edit-btn', function () {
    $(this)
      .removeClass('leave-edit-btn')
      .addClass('leave-cancel-btn')
      .text('Save');
    $(this).parent().parent().find('input').prop('disabled', false);
    $('.edit-search').addClass('d-block');
    return false;
  });
  $(document).on('click', '.leave-edit-about', function () {
    $(this)
      .removeClass('leave-edit-about')
      .addClass('leave-cancel-btn')
      .text('Save');
    $(this).parent().parent().find('textarea').prop('disabled', false);
    return false;
  });

  // Leave Settings button show

  $(document).on('click', '.leave-edit-btn', function () {
    $(this)
      .removeClass('leave-edit-btn')
      .addClass('leave-cancel-btn')
      .text('Save');
    $(this).parent().parent().find('input').prop('disabled', false);
    $('.edit-search').addClass('d-block');
    return false;
  });
  $(document).on('click', '.leave-edit-about', function () {
    $(this)
      .removeClass('leave-edit-about')
      .addClass('leave-cancel-btn')
      .text('Save');
    $(this).parent().parent().find('textarea').prop('disabled', false);
    return false;
  });

  $('.text-about').each(function () {
    $(this).val($(this).val().trim());
  });

  $('#nav-profile-tab').click(function () {
    $('.book-header h4').text('Member');
  });
  $('#nav-settings-tab').click(function () {
    $('.book-header h4').text('Edit team');
  });

  $(document).on('click', '.workspacesmain', function () {
    $('.book-tabs ul li a.workspacesmain').addClass('active');
    $('.book-tabs ul li a.roommain').removeClass('active');
    $('.workspacediv').addClass('showdiv');
    $('.roomdiv').addClass('hidediv');
    $('.roomdiv').removeClass('showdiv');
  });
  $(document).on('click', '.roommain', function () {
    $('.book-tabs ul li a.roommain').addClass('active');
    $('.book-tabs ul li a.workspacesmain').removeClass('active');
    $('.roomdiv').addClass('showdiv');
    $('.roomdiv').removeClass('hidediv');
    $('.workspacediv').addClass('hidediv');
    $('.workspacediv').removeClass('showdiv');
  });

  // Placeholder

  $(document).on('keyup', '.value-input', function () {
    $('.place-input').addClass('d-none');
    if ($(this).val() == '') {
      $('.place-input').addClass('d-block');
    } else {
      $('.place-input').removeClass('d-block');
    }
  });

  // Floor Slider

  if ($('.floor-slider').length > 0) {
    var owl = $('.floor-slider');
    owl.owlCarousel({
      items: 5,
      loop: false,
      dots: false,
      nav: true,
      center: true,
      touchDrag: false,
      mouseDrag: false,
      responsiveClass: true,
      startPosition: 3,
      margin: 10,
      autoplay: false,
      navText: [
        '<i class="fas fa-chevron-left custom-arrow"></i>',
        '<i class="fas fa-chevron-right custom-arrow"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5,
        },
        1200: {
          items: 5,
        },
        1500: {
          items: 5,
        },
        1920: {
          items: 5,
        },
      },
    });
  }

  if (window.webshims) {
    webshims.setOptions('forms', {
      customDatalist: true,
    });
    webshims.polyfill('forms');
  }

  // Span Checkbox

  $('.zone-checkbox-inner .zone-checkbox').on('click', function () {
    $('.zone-checkbox-inner span.active').removeClass('active');
    $(this).addClass('active');
  });

  // Increment or Decrement

  $('.zone-btn').on('click', function () {
    var $button = $(this);
    var oldValue = $button
      .closest('.zone-number')
      .find('input.zone-input')
      .val();
    if ($button.text() == '+') {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.closest('.zone-number').find('input.zone-input').val(newVal);
  });

  // Filter

  $(document).on('click', '#view_zone', function () {
    $('#zone_inputs').slideToggle('slow');
    $('body').toggleClass('filter-show');
  });

  $(document).on('click', '#view_zone_two', function () {
    $('#zone_inputs_two').slideToggle('slow');
    $('body').toggleClass('filter-show');
  });

  $(document).on('click', '#view_zone_three', function () {
    $('#zone_inputs_three').slideToggle('slow');
    $('body').toggleClass('filter-show');
  });

  $(document).on('click', '#view_zone_four', function () {
    $('#zone_inputs_four').slideToggle('slow');
    $('body').toggleClass('filter-show');
  });
})(jQuery);
