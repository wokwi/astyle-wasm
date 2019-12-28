const { format } = require('./index');

describe('astyle format', () => {
  it('should format the given C code', async () => {
    expect(await format('void foo(){bar();}', '')).toEqual(`void foo() {    bar();}`);
  });

  it('respect the given parser options (indent size = 2)', async () => {
    expect(await format('void foo(){\nbar1();bar2();}', 'indent=spaces=2')).toEqual(
      `void foo() {\n  bar1();\n  bar2();\n}`
    );
  });

  it('should report warnings and errors to the given callback function', async () => {
    const outputCallback = jest.fn();
    expect(await format('', 'badoption', outputCallback)).toEqual('');
    expect(outputCallback).toHaveBeenCalledWith(
      130,
      'Invalid Artistic Style options:\n\tbadoption\n'
    );
  });
});
