export function validateFields(fields: Record<string, string>) {
  const data: Record<string, string> = {};
  const missing: string[] = [];
  for (const key in fields) {
    const value = fields[key];
    if (value && value.trim() !== '') {
      data[key] = value.trim();
    } else {
      missing.push(key);
    }
  }
  return {
    valid: missing.length === 0,
    data,
    missing,
  };
}
