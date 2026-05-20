import TutorDetailsCard from "@/components/TutorDetailsCard";


export default async function TutorsDetailsPage({ params }) {

    const { id } = await params;

    console.log("Fetching tutor with ID:", id);

    const res = await fetch(`http://localhost:4000/tutors/${id}`, {
        cache: "no-store",
    });

    console.log("API Response status:", res.status);

    const tutor = await res.json();

    console.log("API Response data:", tutor);

    return (
        <TutorDetailsCard
            tutor={tutor}
            id={id}
        />
    );
}