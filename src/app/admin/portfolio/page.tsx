"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Pencil, Star } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";


interface PortfolioItem {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    additionalImages: string[];
    location: string;
    completionDate: string;
    clientName: string;
}

interface TestimonialItem {
    id?: string;
    clientName: string;
    role: string;
    content: string;
    rating: number;
}

export default function AdminPortfolioPage() {
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [activeTab, setActiveTab] = useState<"projects" | "testimonials">("projects");

    // Projects State
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [editingProject, setEditingProject] = useState<string | null>(null);
    const [projectForm, setProjectForm] = useState<PortfolioItem>({
        title: "",
        description: "",
        imageUrl: "",
        additionalImages: [],
        location: "",
        completionDate: "",
        clientName: "",
    });

    // Testimonials State
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
    const [testimonialForm, setTestimonialForm] = useState<TestimonialItem>({
        clientName: "",
        role: "",
        content: "",
        rating: 5,
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [portRes, testRes] = await Promise.all([
                axios.get("/api/portfolio"),
                axios.get("/api/testimonials"),
            ]);
            setProjects(portRes.data);
            setTestimonials(testRes.data);
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Project Handlers
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingProject) {
                await axios.put(`/api/portfolio/${editingProject}`, projectForm);
                toast.success("Project updated");
            } else {
                await axios.post("/api/portfolio", projectForm);
                toast.success("Project added");
            }
            setEditingProject(null);
            setProjectForm({ title: "", description: "", imageUrl: "", additionalImages: [], location: "", completionDate: "", clientName: "" });
            fetchData();
        } catch (error) {
            toast.error("Failed to save project");
        } finally {
            setLoading(false);
        }
    };

    const handleProjectDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        try {
            await axios.delete(`/api/portfolio/${id}`);
            toast.success("Project deleted");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };



    // Testimonial Handlers
    const handleTestimonialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingTestimonial) {
                await axios.put(`/api/testimonials/${editingTestimonial}`, testimonialForm);
                toast.success("Testimonial updated");
            } else {
                await axios.post("/api/testimonials", testimonialForm);
                toast.success("Testimonial added");
            }
            setEditingTestimonial(null);
            setTestimonialForm({ clientName: "", role: "", content: "", rating: 5 });
            fetchData();
        } catch (error) {
            toast.error("Failed to save testimonial");
        } finally {
            setLoading(false);
        }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await axios.delete(`/api/testimonials/${id}`);
            toast.success("Testimonial deleted");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete testimonial");
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <Toaster />
            <div className="mb-8 mt-4">
                <h1 className="text-3xl font-serif text-gray-900 mb-2">Portfolio & Testimonials Manager</h1>
                <p className="text-gray-500">Manage your major works and client feedback.</p>
            </div>

            <div className="flex gap-4 mb-8 bg-gray-100 p-1 rounded-2xl">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "projects" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Major Projects
                </button>
                <button
                    onClick={() => setActiveTab("testimonials")}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "testimonials" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Client Testimonials
                </button>
            </div>

            {activeTab === "projects" ? (
                <div className="space-y-8">
                    {/* Project Form */}
                    <form onSubmit={handleProjectSubmit} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-xl font-medium mb-4">{editingProject ? "Edit Project" : "Add New Project"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text" placeholder="Project Title" required
                                value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                            />
                            <input
                                type="text" placeholder="Location"
                                value={projectForm.location} onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                            />
                            <input
                                type="text" placeholder="Client Name"
                                value={projectForm.clientName} onChange={e => setProjectForm({ ...projectForm, clientName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                            />
                            <input
                                type="text" placeholder="Completion Date (e.g. June 2023)"
                                value={projectForm.completionDate} onChange={e => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                            />
                        </div>
                        <textarea
                            placeholder="Description" required rows={4}
                            value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Project Image</label>
                            <div className="flex items-center gap-4 mt-2">
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        if (res && res[0]) {
                                            setProjectForm(prev => ({ ...prev, imageUrl: res[0].url }));
                                            toast.success("Image uploaded");
                                        }
                                        setUploadingImage(false);
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR! ${error.message}`);
                                        setUploadingImage(false);
                                    }}
                                    onUploadBegin={() => {
                                        setUploadingImage(true);
                                    }}
                                    appearance={{
                                        container: "!w-72",
                                        button: "bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-gray-100 !text-xs !text-black font-medium w-full h-auto py-4 after:bg-[#D4AF37]",
                                        allowedContent: "block"
                                    }}
                                    content={{
                                        button({ ready }) {
                                            if (uploadingImage) return "Uploading...";
                                            if (projectForm.imageUrl) return "Change Image";
                                            return "Upload Project Image";
                                        }
                                    }}
                                />
                            </div>
                            {projectForm.imageUrl && <img src={projectForm.imageUrl} className="w-40 h-24 object-contain bg-white rounded-lg border mt-2" />}
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" disabled={loading} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all">
                                {editingProject ? "Update Project" : "Add Project"}
                            </button>
                            {editingProject && <button onClick={() => { setEditingProject(null); setProjectForm({ title: "", description: "", imageUrl: "", additionalImages: [], location: "", completionDate: "", clientName: "" }) }} className="px-6 py-3 border rounded-xl">Cancel</button>}
                        </div>
                    </form>

                    {/* Projects List */}
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b"><h3 className="font-medium">Existing Projects</h3></div>
                        <div className="divide-y max-h-96 overflow-y-auto custom-scrollbar">
                            {projects.length === 0 ? <p className="p-10 text-center text-gray-400">No projects added yet.</p> : projects.map(p => (
                                <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                    <img src={p.imageUrl} className="w-16 h-12 object-contain bg-white rounded-lg border" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{p.title}</h4>
                                        <p className="text-xs text-gray-400">{p.location || "No location"}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingProject(p.id!); setProjectForm(p) }} className="p-2 text-gray-400 hover:text-[#D4AF37]"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => handleProjectDelete(p.id!)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Testimonial Form */}
                    <form onSubmit={handleTestimonialSubmit} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-xl font-medium mb-4">{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text" placeholder="Client Name" required
                                value={testimonialForm.clientName} onChange={e => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                            />
                            <input
                                type="text" placeholder="Role / Company (e.g. CEO at ABC)"
                                value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                            />
                        </div>
                        <textarea
                            placeholder="Testimonial Content" required rows={3}
                            value={testimonialForm.content} onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                        />
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium">Rating</label>
                            {[1, 2, 3, 4, 5].map(s => (
                                <button type="button" key={s} onClick={() => setTestimonialForm({ ...testimonialForm, rating: s })}>
                                    <Star className={`w-5 h-5 ${testimonialForm.rating >= s ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" disabled={loading} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all">
                                {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                            </button>
                            {editingTestimonial && <button onClick={() => { setEditingTestimonial(null); setTestimonialForm({ clientName: "", role: "", content: "", rating: 5 }) }} className="px-6 py-3 border rounded-xl">Cancel</button>}
                        </div>
                    </form>

                    {/* Testimonials List */}
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b"><h3 className="font-medium">Client Feedback</h3></div>
                        <div className="divide-y max-h-96 overflow-y-auto custom-scrollbar">
                            {testimonials.length === 0 ? <p className="p-10 text-center text-gray-400">No testimonials added yet.</p> : testimonials.map(t => (
                                <div key={t.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{t.clientName}</h4>
                                        <p className="text-xs text-gray-400 line-clamp-1">{t.content}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingTestimonial(t.id!); setTestimonialForm(t) }} className="p-2 text-gray-400 hover:text-[#D4AF37]"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => handleTestimonialDelete(t.id!)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
