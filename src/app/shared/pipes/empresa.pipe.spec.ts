import { EmpresaPipe } from './empresa.pipe';

describe('EmpresaPipe', () => {
  it('create an instance', () => {
    const pipe = new EmpresaPipe();
    expect(pipe).toBeTruthy();
  });
});
