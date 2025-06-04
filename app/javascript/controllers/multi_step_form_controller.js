// app/javascript/controllers/multi_step_form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["step", "progressBar", "progressText"]

  connect() {
    this.currentStep = 0;
    this.showCurrentStep();
    this.updateProgressBar();
    console.log("Multi-step form controller connected.");
    console.log(`Total steps found: ${this.stepTargets.length}`);
    this.stepTargets.forEach((step, index) => {
      console.log(`Step ${index} element:`, step);
    });
  }

  nextStep(event) { // <--- Added 'event' parameter
    console.log("Next Step button clicked!");
    console.log(`Current step before increment: ${this.currentStep}`);
    console.log(`Total steps: ${this.stepTargets.length}`);

    const currentStepElement = this.stepTargets[this.currentStep];

    // --- Start of Validation Logic ---
    // Get all input, select, and textarea elements within the current step
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    let allValid = true;

    // Iterate over inputs and check validity
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      // Skip hidden fields (like the d-none for images if not part of validation logic)
      // and also skip the actual file input itself as its validation is usually handled differently
      if (input.type === 'hidden' || input.id === 'surfboard_image_input') {
        continue;
      }

      if (!input.checkValidity()) {
        allValid = false;
        input.reportValidity(); // Show browser's default validation message
        // Optional: Add a class for visual feedback (e.g., Bootstrap's 'is-invalid')
        input.classList.add('is-invalid');
        break; // Stop at the first invalid input
      } else {
        input.classList.remove('is-invalid'); // Remove invalid state if it was there
      }
    }

    if (!allValid) {
      console.log("Validation failed. Not moving to next step.");
      // If you want to stop the event propagation (though for buttons, returning early is enough)
      // event.preventDefault();
      return; // Stop the function execution if validation fails
    }
    // --- End of Validation Logic ---

    // If validation passes, proceed to the next step
    if (this.currentStep < this.stepTargets.length - 1) {
      this.currentStep++;
      console.log(`Current step after increment: ${this.currentStep}`);
      this.showCurrentStep();
      this.updateProgressBar();
    } else {
      console.log("Already at the last step.");
    }
  }

  prevStep() {
    console.log("Prev Step button clicked!");
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showCurrentStep();
      this.updateProgressBar();
    }
  }

  showCurrentStep() {
    console.log(`Showing step: ${this.currentStep}`);
    this.stepTargets.forEach((step, index) => {
      if (index === this.currentStep) {
        step.classList.remove('d-none');
        console.log(`Removed d-none from step ${index}`);
      } else {
        step.classList.add('d-none');
        console.log(`Added d-none to step ${index}`);
      }
    });
  }

  updateProgressBar() {
    const totalSteps = this.stepTargets.length;
    const progress = ((this.currentStep + 1) / totalSteps) * 100;
    this.progressBarTarget.style.width = `${progress}%`;
    this.progressBarTarget.setAttribute('aria-valuenow', progress);
    this.progressTextTarget.textContent = `Step ${this.currentStep + 1} of ${totalSteps}`;
    console.log(`Progress bar updated to: ${progress}%`);
  }
}
