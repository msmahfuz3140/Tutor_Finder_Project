import TutorCard from "@/components/TutorCard";

const TutorsPage = async () => {
    const res = await fetch("http://localhost:4000/tutors", {
        cache: "no-store",
    });

    const tutors = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-8">
                All Tutors
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tutors.map((tutor, index) => (
                    <TutorCard key={index} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default TutorsPage;