export function getGender(gender: string | null): string {
	return gender === "female" ? "여" : "남";
}
