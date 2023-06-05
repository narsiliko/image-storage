import { FilterImagesByNamePipe } from './filter-images-by-name.pipe';

describe('FilterImagesByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterImagesByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
