(function ($) {
  "use strict";

  $(function () {
    $('#task-3-solution-js').load("js/shri.js");
    $('.toggle-solution').on('click', function (e) {
      var self = $(this);
      var solution = self.siblings('.task-solution');
      if (solution.hasClass('open')) {
        solution.slideUp();
        self.text(self.data('open') || 'Показать решение');
      } else {
        solution.slideDown();
        $('html, body').animate({scrollTop: solution.offset().top}, 1000);
        self.text(self.data('close') || 'Скрыть решение');
      }
      solution.toggleClass('open');
      e.preventDefault();
    });

    SyntaxHighlighter.all();
  });
})(jQuery);