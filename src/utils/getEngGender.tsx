export function getEngGender(koGender : string | null ) : string {
	return koGender === "남" ? "male" : "female"
}