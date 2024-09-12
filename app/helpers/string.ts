export function getInitials(name: string): string {
  const nameParts = name.trim().split(" ");

  if (nameParts.length >= 2) {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  } else {
    return nameParts[0].slice(0, 2).toUpperCase();
  }
}
