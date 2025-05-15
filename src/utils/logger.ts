
/**
 * Enhanced logger utility for debugging form submissions
 */

export const logger = {
  debug: (message: string, data?: any) => {
    console.log(`[DEBUG] ${message}`, data || '');
  },
  
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  
  error: (message: string, error: any) => {
    console.error(`[ERROR] ${message}`, error);
    if (error instanceof Error) {
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack: ${error.stack}`);
    }
  },
  
  // Log specifically for form submissions
  form: {
    start: (formName: string, data: any) => {
      console.group(`📝 Form Submission: ${formName}`);
      console.log('📤 Form Data:', data);
    },
    
    step: (stepName: string, data?: any) => {
      console.log(`✅ ${stepName}`, data || '');
    },
    
    error: (stepName: string, error: any) => {
      console.error(`❌ Error in ${stepName}:`, error);
      if (error instanceof Error) {
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack: ${error.stack}`);
      }
    },
    
    end: (success: boolean, message: string) => {
      console.log(`${success ? '✅' : '❌'} ${message}`);
      console.groupEnd();
    }
  }
};
