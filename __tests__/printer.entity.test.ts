let printer;
const IpRegEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

describe('Printer entity tests', () => {
  describe('id property tests.', () => {
    test('Printer entity contains id property.', () => {
      expect(printer).toHaveProperty('id');
      expect(printer.id).toBeDefined();
    })

    test('Printer entity contains uuid in id property.', () => {
      expect(printer.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm)
    })
  })
  describe('name property tests.', () => {

    test('Printer entity name property.', () => {
      expect(printer).toHaveProperty('name');
      expect(printer.name).toBeDefined();
    })
  })
  describe('ip property tests.', () => {
    test('Printer entity ip property.', () => {
      expect(printer).toHaveProperty('ip');
      expect(printer.ip).toBeDefined();
    })
    test('should throw error for invalid ip.', () => {
      expect(() => {

      }).toThrowError('invalid ip address.')
    })
  })
  describe('isMultifunctional', () => {

    test('Printer entity has isMultifunctional property.', () => {
      expect(printer).toHaveProperty('isMultifunctional');
      expect(printer.isMultifunctional).toBeDefined();
    })

    test('isMultifunctional property is boolean.', () => {
      expect(printer.isMultifunctional).toBe('boolean');
    })

  })
  describe('area property tests.', () => {

    test('Printer entity has area property.', () => {
      expect(printer).toHaveProperty('area');
      expect(printer.area).toBeDefined();
    })

  })
  describe('location property tests.', () => {

    test('Printer entity has location property.', () => {
      expect(printer).toHaveProperty('location');
      expect(printer.location).toBeDefined();
    })

  })
  describe('model property tests.', () => {

    test('Printer entity has model property.', () => {
      expect(printer).toHaveProperty('model');
      expect(printer.model).toBeDefined();
    })

    test('throws error for undefined model ', () => {
      expect(printer).toHaveProperty('model');
      expect(printer.model).toBeDefined();
    })

  })
})