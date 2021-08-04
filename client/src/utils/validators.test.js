import { validate, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from './validators';

describe('validators tests', () => {
    it('should test required field validator', () => {
        const validators = [VALIDATOR_REQUIRE()];
        const value1 = '';
        const value2 = 'Test';
        let isValidInput = false; 
        isValidInput = validate(value1, validators);
        expect(isValidInput).toBe(false);
        isValidInput = validate(value2, validators);
        expect(isValidInput).toBe(true);
    });

    it('should validate the email', () => {
        const validators = [VALIDATOR_EMAIL()];
        const value = 'test.user@';
        const isValidEmail = validate(value, validators);
        expect(isValidEmail).toBe(false);
    });
});