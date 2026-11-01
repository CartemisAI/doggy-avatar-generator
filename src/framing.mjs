/** Resolve composition from the logical display size, independent of pixel density. */
export function resolveFraming(size = 256, framing = 'auto') {
  if (!Number.isInteger(size) || size < 1 || size > 4096) {
    throw new RangeError('size must be an integer between 1 and 4096');
  }
  if (!['auto', 'full', 'bust', 'head'].includes(framing)) {
    throw new RangeError('framing must be auto, full, bust or head');
  }
  return framing === 'auto' ? (size === 24 || size === 32 ? 'bust' : 'full') : framing;
}
