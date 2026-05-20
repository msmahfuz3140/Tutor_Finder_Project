"use client"
import { Button, Select, FieldError, Input, Label, ListBox, TextArea, TextField, toast } from '@heroui/react';


const AddTutorPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const tutor = Object.fromEntries(formData.entries());

        // ✅ Convert numbers
        tutor.hourlyFee = Number(tutor.hourlyFee);
        tutor.totalSlot = Number(tutor.totalSlot);

        try {
            const res = await fetch("http://localhost:4000/tutors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tutor),
            });

            if (!res.ok) throw new Error("Failed");
 
            await res.json();

            toast.success("Tutor added successfully ✅");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-14 px-4">

            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Add Tutor
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Create and manage tutor profiles professionally.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">

                    <form onSubmit={onSubmit} className="space-y-12">

                        {/* ================= TUTOR BASIC INFO ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Tutor Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Tutor Name */}
                                <TextField name="tutorName" isRequired>
                                    <Label>Tutor Name</Label>
                                    <Input placeholder="John Doe" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                                {/* Tutor Photo */}
                                <TextField name="photoUrl" isRequired>
                                    <Label>Photo URL (imgbb / postimage)</Label>
                                    <Input
                                        type="url"
                                        placeholder="https://i.ibb.co/example.jpg"
                                        className="rounded-xl h-12"
                                    />
                                    <FieldError />
                                </TextField>

                                {/* Subject */}
                                <Select name="subject" isRequired placeholder="Select Subject">
                                    <Label>Subject / Category</Label>

                                    <Select.Trigger className="rounded-xl h-12">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {[
                                                "Mathematics",
                                                "Physics",
                                                "Chemistry",
                                                "Biology",
                                                "ICT",
                                                "English",
                                                "Bangla",
                                            ].map((item) => (
                                                <ListBox.Item key={item} id={item}>
                                                    {item}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                {/* Teaching Mode */}
                                <Select name="teachingMode" isRequired placeholder="Select Mode">
                                    <Label>Teaching Mode</Label>

                                    <Select.Trigger className="rounded-xl h-12">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            {["Online", "Offline", "Both"].map((mode) => (
                                                <ListBox.Item key={mode} id={mode}>
                                                    {mode}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                            </div>
                        </div>


                        {/* ================= AVAILABILITY ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Availability
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <TextField name="availableDays" isRequired>
                                    <Label>Available Days</Label>
                                    <Input
                                        placeholder="Sun - Thu"
                                        className="rounded-xl h-12"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField name="timeSlot" isRequired>
                                    <Label>Available Time Slot</Label>
                                    <Input
                                        placeholder="5:00 PM - 8:00 PM"
                                        className="rounded-xl h-12"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField name="sessionStart" type="date" isRequired>
                                    <Label>Session Start Date</Label>
                                    <Input type="date" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                                <TextField name="totalSlot" type="number" isRequired>
                                    <Label>Total Slot</Label>
                                    <Input type="number" placeholder="20" className="rounded-xl h-12" />
                                    <FieldError />
                                </TextField>

                            </div>
                        </div>


                        {/* ================= PRICING ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Pricing
                            </h2>

                            <TextField name="hourlyFee" type="number" isRequired>
                                <Label>Hourly Fee (BDT)</Label>
                                <Input
                                    type="number"
                                    placeholder="500"
                                    className="rounded-xl h-12"
                                />
                                <FieldError />
                            </TextField>
                        </div>


                        {/* ================= PROFESSIONAL DETAILS ================= */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-3">
                                Professional Details
                            </h2>

                            <TextField name="institutionExperience" isRequired>
                                <Label>Institution & Experience</Label>
                                <TextArea
                                    placeholder="Dhaka University | 5 Years Teaching Experience"
                                    className="rounded-2xl min-h-32"
                                />
                                <FieldError />
                            </TextField>

                            <TextField name="location" isRequired>
                                <Label>Location (Area / City)</Label>
                                <Input
                                    placeholder="Dhanmondi, Dhaka"
                                    className="rounded-xl h-12"
                                />
                                <FieldError />
                            </TextField>
                        </div>


                        {/* ================= SUBMIT ================= */}
                        <div className="flex justify-center md:justify-end pt-6 border-t">
                            <Button
                                type="submit"
                                className="px-10 py-6 text-lg font-semibold rounded-xl
            bg-gradient-to-r from-indigo-500 to-blue-600
            hover:from-indigo-600 hover:to-blue-700
            text-white shadow-lg transition-all duration-300"
                            >
                                Add Tutor
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutorPage;