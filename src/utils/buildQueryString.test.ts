import { describe, it, expect } from 'vitest';
import { buildQueryString } from './buildQueryString';

describe('buildQueryString', () => {
  it('returns an empty string for null or empty objects', () => {
    expect(buildQueryString(null)).toBe('');
    expect(buildQueryString({})).toBe('');
  });

  it('builds a valid query string', () => {
    expect(buildQueryString({ limit: 20, sortBy: 'date_desc' }))
      .toBe('?limit=20&sortBy=date_desc');
  });

  it('ignores null, undefined, and empty strings, but keeps false and 0', () => {
    expect(buildQueryString({ 
      category: undefined, 
      startDate: '', 
      offset: 0, 
      active: false 
    })).toBe('?offset=0&active=false');
  });

  it('formats Date objects as YYYY-MM-DD', () => {
    const date = new Date('2024-09-16T14:30:00Z');
    expect(buildQueryString({ startDate: date })).toBe('?startDate=2024-09-16');
  });
});