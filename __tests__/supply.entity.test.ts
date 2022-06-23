let supply;

describe('Supply entity tests', () => {

  describe('id property tests.', () => {
    test('Entity has id property.', () => {
      expect(supply).toHaveProperty('id');
      expect(supply.id).toBeDefined();
    })
    test('id value should be uuid.', () => {
      expect(supply.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm)
    })
  })

  describe('name property tests.', () => {
    test('Supply entity should have name property.', () => {
      expect(supply).toHaveProperty('name');
      expect(supply.name).toBeDefined();
    })
  })

  describe('code property tests.', () => {
    test('Supply entity should have code property.', () => {
      expect(supply).toHaveProperty('code');
      expect(supply.code).toBeDefined();
    })
  })

  describe('isAvailable property tests.', () => {
    test('Supply entity should have isAvailable property.', () => {
      expect(supply).toHaveProperty('isAvailable');
      expect(supply.isAvailable).toBeDefined();
      expect(typeof supply.isAvailabe).toBe('boolean')
    })
  })

  describe('model property tests.', () => {
    test('Supply entity should have model property.', () => {
      expect(supply).toHaveProperty('model');
      expect(supply.model).toBeDefined();
    })
  })

  describe('storedAt property tests.', () => {
    test('Supply entity should have storedAt property.', () => {
      expect(supply).toHaveProperty('storedAt');
      expect(supply.storedAt).toBeDefined();
    })
  })

  describe('installedAt property tests.', () => {
    test('Supply entity should have installedAt property.', () => {
      expect(supply).toHaveProperty('installedAt');
      expect(supply.installedAt).toBeDefined();
    })
  })

  describe('printerId property tests.', () => {
    test('Supply entity should have printerId property.', () => {
      expect(supply).toHaveProperty('printerId');
    })
    test('Default printerId property should be null.', () => {
      expect(supply.printerId).toBeNull();
    })
  })
})