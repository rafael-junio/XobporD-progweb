$(document).ready(() => {
  $('.stepper').activateStepper();
});

function validateStepOne() {
  // Extract the checked checkboxes from the first step
  if ($('.step').first().find('input[type="checkbox"]:checked').length) return true;
  return true;
}


/* Materializecss Stepper - By Kinark 2016
  // https://github.com/Kinark/Materialize-stepper
  // JS v2.1.3
  */

const validation = $.isFunction($.fn.valid) ? 1 : 0;

$.fn.isValid = function () {
  if (validation) {
    return this.valid();
  }
  return true;
};

if (validation) {
  $.validator.setDefaults({
    errorClass: 'invalid',
    validClass: 'valid',
    errorPlacement(error, element) {
      if (element.is(':radio') || element.is(':checkbox')) {
        error.insertBefore($(element).parent());
      } else {
        error.insertAfter(element); // default error placement.
        // element.closest('label').data('error', error);
        // element.next().attr('data-error', error);
      }
    },
    success(element) {
      if (!$(element).closest('li').find('label.invalid:not(:empty)').length) {
        $(element).closest('li').removeClass('wrong');
      }
    },
  });

  // When parallel stepper is defined we need to consider invisible and
  // hidden fields
  if ($('.stepper.parallel').length) $.validator.setDefaults({ ignore: '' });
}

$.fn.getActiveStep = function () {
  const active = this.find('.step.active');
  return $(this.children('.step:visible')).index($(active)) + 1;
};

$.fn.activateStep = function (callback) {
  if ($(this).hasClass('step')) return;
  const stepper = $(this).closest('ul.stepper');
  stepper.find('>li').removeAttr('data-last');
  if (window.innerWidth < 993 || !stepper.hasClass('horizontal')) {
    $(this)
      .addClass('step')
      .stop()
      .slideDown(400, function () {
        $(this).css({
          height: 'auto',
          'margin-bottom': '',
          display: 'inherit',
        });
        if (callback) callback();
        stepper.find('>li.step').last().attr('data-last', 'true');
      });
  } else {
    $(this)
      .addClass('step')
      .stop()
      .css({ width: '0%', display: 'inherit' })
      .animate({ width: '100%' }, 400, function () {
        $(this).css({
          height: 'auto',
          'margin-bottom': '',
          display: 'inherit',
        });
        if (callback) callback();
        stepper.find('>li.step').last().attr('data-last', 'true');
      });
  }
};

$.fn.deactivateStep = function (callback) {
  if (!$(this).hasClass('step')) return;
  const stepper = $(this).closest('ul.stepper');
  stepper.find('>li').removeAttr('data-last');
  if (window.innerWidth < 993 || !stepper.hasClass('horizontal')) {
    $(this)
      .stop()
      .css({ transition: 'none', '-webkit-transition': 'margin-bottom none' })
      .slideUp(400, function () {
        $(this)
          .removeClass('step')
          .css({
            height: 'auto',
            'margin-bottom': '',
            transition: 'margin-bottom .4s',
            '-webkit-transition': 'margin-bottom .4s',
          });
        if (callback) callback();
        stepper.find('>li').removeAttr('data-last');
        stepper.find('>li.step').last().attr('data-last', 'true');
      });
  } else {
    $(this)
      .stop()
      .animate({ width: '0%' }, 400, function () {
        $(this)
          .removeClass('step')
          .hide()
          .css({
            height: 'auto',
            'margin-bottom': '',
            display: 'none',
            width: '',
          });
        if (callback) callback();
        stepper.find('>li.step').last().attr('data-last', 'true');
      });
  }
};

$.fn.showError = function (error) {
  if (validation) {
    const name = this.attr('name');
    const form = this.closest('form');
    const obj = {};
    obj[name] = error;
    form.validate().showErrors(obj);
    this.closest('li').addClass('wrong');
  } else {
    this.removeClass('valid').addClass('invalid');
    this.next().attr('data-error', error);
  }
};

$.fn.activateFeedback = function () {
  const active = this.find('.step.active:not(.feedbacking)')
    .addClass('feedbacking')
    .find('.step-content');
  active.prepend(
    '<div class="wait-feedback"> <div class="preloader-wrapper active"> <div class="spinner-layer spinner-blue"> <div class="circle-clipper left"> <div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"> <div class="circle"></div></div></div><div class="spinner-layer spinner-red"> <div class="circle-clipper left"> <div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"> <div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"> <div class="circle-clipper left"> <div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"> <div class="circle"></div></div></div><div class="spinner-layer spinner-green"> <div class="circle-clipper left"> <div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"> <div class="circle"></div></div></div></div></div>',
  );
};

$.fn.destroyFeedback = function () {
  const active = this.find('.step.active.feedbacking');
  if (active) {
    active.removeClass('feedbacking');
    active.find('.wait-feedback').remove();
  }
  return true;
};

$.fn.resetStepper = function (step) {
  if (!step) step = 1;
  const form = $(this).closest('form');
  $(form)[0].reset();
  Materialize.updateTextFields();
  return $(this).openStep(step);
};

$.fn.submitStepper = function (step) {
  const form = this.closest('form');
  if (form.isValid()) {
    form.submit();
  }
};

$.fn.nextStep = function (callback, activefb, e) {
  const stepper = this;
  const settings = $(stepper).data('settings');
  const form = this.closest('form');
  const active = this.find('.step.active');
  const next = $(this.children('.step:visible')).index($(active)) + 2;
  const feedback = active.find('.next-step').length > 1
    ? e
      ? $(e.target).data('feedback')
      : undefined
    : active.find('.next-step').data('feedback');
  // If the stepper is parallel, we want to validate the input of the current active step. Not all elements.
  if (
    (settings.parallel && $(active).validateStep())
    || (!settings.parallel && form.isValid())
  ) {
    if (feedback && activefb) {
      if (settings.showFeedbackLoader) stepper.activateFeedback();
      return window[feedback].call();
    }
    active.removeClass('wrong').addClass('done');
    this.openStep(next, callback);
    return this.trigger('nextstep');
  }
  return active.removeClass('done').addClass('wrong');
};

$.fn.prevStep = function (callback) {
  const active = this.find('.step.active');
  if (active.hasClass('feedbacking')) return;
  const prev = $(this.children('.step:visible')).index($(active));
  active.removeClass('wrong');
  this.openStep(prev, callback);
  return this.trigger('prevstep');
};

$.fn.openStep = function (step, callback) {
  const settings = $(this).closest('ul.stepper').data('settings');
  const $this = this;
  const step_num = step - 1;
  step = this.find(`.step:visible:eq(${step_num})`);
  if (step.hasClass('active')) return;
  const active = this.find('.step.active');
  let next;
  const prev_active = (next = $(this.children('.step:visible')).index($(active)));
  const order = step_num > prev_active ? 1 : 0;
  if (active.hasClass('feedbacking')) $this.destroyFeedback();
  active.closeAction(order);
  step.openAction(order, () => {
    if (settings.autoFocusInput) step.find('input:enabled:visible:first').focus();
    $this.trigger('stepchange').trigger(`step${step_num + 1}`);
    if (step.data('event')) $this.trigger(step.data('event'));
    if (callback) callback();
  });
};

$.fn.closeAction = function (order, callback) {
  const closable = this.removeClass('active').find('.step-content');
  if (window.innerWidth < 993 || !this.closest('ul').hasClass('horizontal')) {
    closable.stop().slideUp(300, 'easeOutQuad', callback);
  } else if (order == 1) {
    closable.animate({ left: '-100%' }, () => {
      closable.css({ display: 'none', left: '0%' }, callback);
    });
  } else {
    closable.animate({ left: '100%' }, () => {
      closable.css({ display: 'none', left: '0%' }, callback);
    });
  }
};

$.fn.openAction = function (order, callback) {
  const openable = this.removeClass('done')
    .addClass('active')
    .find('.step-content');
  if (window.innerWidth < 993 || !this.closest('ul').hasClass('horizontal')) {
    openable.slideDown(300, 'easeOutQuad', callback);
  } else if (order == 1) {
    openable
      .css({ left: '100%', display: 'block' })
      .animate({ left: '0%' }, callback);
  } else {
    openable
      .css({ left: '-100%', display: 'block' })
      .animate({ left: '0%' }, callback);
  }
};

$.fn.activateStepper = function (options) {
  const settings = $.extend(
    {
      linearStepsNavigation: true,
      autoFocusInput: true,
      showFeedbackLoader: true,
      autoFormCreation: true,
      parallel: false, // By default we don't assume the stepper is parallel
    },
    options,
  );
  $(document).on('click', (e) => {
    if (!$(e.target).parents('.stepper').length) {
      $('.stepper.focused').removeClass('focused');
    }
  });

  $(this).each(function () {
    const $stepper = $(this);
    if (!$stepper.parents('form').length && settings.autoFormCreation) {
      var method = $stepper.data('method');
      let action = $stepper.data('action');
      var method = method || 'GET';
      action = action || '?';
      $stepper.wrap(
        `<form action="${action}" method="${method}"></form>`,
      );
    }

    $stepper.data('settings', {
      linearStepsNavigation: settings.linearStepsNavigation,
      autoFocusInput: settings.autoFocusInput,
      showFeedbackLoader: settings.showFeedbackLoader,
      parallel: $stepper.hasClass('parallel'),
    });
    $stepper.find('li.step.active').openAction(1);
    $stepper.find('>li').removeAttr('data-last');
    $stepper.find('>li.step').last().attr('data-last', 'true');

    $stepper
      .on('click', '.step:not(.active)', function () {
        const object = $($stepper.children('.step:visible')).index($(this));
        if ($stepper.data('settings').parallel && validation) {
          // Invoke parallel stepper behaviour
          $(this).addClass('temp-active');
          $stepper.validatePreviousSteps();
          $stepper.openStep(object + 1);
          $(this).removeClass('temp-active');
        } else if (!$stepper.hasClass('linear')) {
          $stepper.openStep(object + 1);
        } else if (settings.linearStepsNavigation) {
          const active = $stepper.find('.step.active');
          if (
            $($stepper.children('.step:visible')).index($(active)) + 1
            == object
          ) {
            $stepper.nextStep(undefined, true, undefined);
          } else if (
            $($stepper.children('.step:visible')).index($(active)) - 1
            == object
          ) {
            $stepper.prevStep(undefined);
          }
        }
      })
      .on('click', '.next-step', (e) => {
        e.preventDefault();
        $stepper.nextStep(undefined, true, e);
      })
      .on('click', '.previous-step', (e) => {
        e.preventDefault();
        $stepper.prevStep(undefined);
      })
      .on('click', 'button:submit:not(.next-step, .previous-step)', (
        e,
      ) => {
        e.preventDefault();
        feedback = e ? $(e.target).data('feedback') : undefined;
        const form = $stepper.closest('form');
        if (form.isValid()) {
          if (feedback) {
            stepper.activateFeedback();
            return window[feedback].call();
          }
          form.submit();
        }
      })
      .on('click', function () {
        $('.stepper.focused').removeClass('focused');
        $(this).addClass('focused');
      });
  });
};

/**
 * Return the step element on given index.
 *
 * @param step, index of the step to be returned
 * @returns {*}, the step requested
 */
$.fn.getStep = function (step) {
  const settings = $(this).closest('ul.stepper').data('settings');
  const $this = this;
  const step_num = step - 1;
  step = this.find(`.step:visible:eq(${step_num})`);
  return step;
};

/**
 * Run validation over all previous steps from the steps this
 * function is called on.
 */
$.fn.validatePreviousSteps = function () {
  const active = $(this).find('.step.temp-active');
  const index = $(this.children('.step')).index($(active));
  // We assume that the validator is set to ignore nothing.
  $(this.children('.step')).each(function (i) {
    if (i >= index) {
      $(this).removeClass('wrong done');
    } else {
      $(this).validateStep();
    }
  });
};

/**
 * Validate the step that this function is called on.
 */
$.fn.validateStep = function () {
  const stepper = this.closest('ul.stepper');
  const form = this.closest('form');
  const step = $(this);
  // Retrieve the custom validator for that step if exists.
  const validator = step.find('.next-step').data('validator');
  if (this.validateStepInput()) {
    // If initial base validation succeeded go on
    if (validator) {
      // If a custom validator is given also call that validator
      if (window[validator].call()) {
        step.removeClass('wrong').addClass('done');
        return true;
      }
      step.removeClass('done').addClass('wrong');
      return false;
    }
    step.removeClass('wrong').addClass('done');
    return true;
  }
  step.removeClass('done').addClass('wrong');
  return false;
};

/**
 * Uses the validation variable set by the stepper constructor
 * to run standard validation on the current step.
 * @returns {boolean}
 */
$.fn.validateStepInput = function () {
  let valid = true;
  if (validation) {
    // Find all input fields dat need validation in current step.
    $(this)
      .find('input.validate')
      .each(function () {
        if (!$(this).valid()) {
          valid = false;
          return false;
        }
      });
  }
  return valid;
};
