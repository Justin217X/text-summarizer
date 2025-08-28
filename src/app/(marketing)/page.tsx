"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { Trash2, Edit, FileText, Plus, Brain, Loader2 } from "lucide-react";

interface Note {
  id: string,
  title: string,
  content: string,
  summary?: string,
  summaryType?: "brief" | "detailed" | "bullet",
  createdAt: string,
  updatedAt: string,
}

type SummaryType = "brief" | "detailed" | "bullet";

export default function MarketingPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [summaryType, setSummaryType] = useState<SummaryType>("brief");
  const [isGeneratingSummary] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const now = new Date().toISOString();
    
    // Temporary Naive summary: take first 2 sentences (or whole content if short) 
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "");

    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? { ...note, title, content, summary, summaryType, updatedAt: now }
            : note,
        ),
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        summary,
        summaryType,
        createdAt: now,
        updatedAt: now,
      }
      setNotes((prev) => [newNote, ...prev]);
    }

    setTitle("");
    setContent("");
  }

  const regenerateSummary = async (noteId: string, newSummaryType: SummaryType) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    // Temporary Naive summary: take first 2 sentences (or whole content if short)
    const sentences = note.content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const newSummary = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "");


    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, summary: newSummary, summaryType: newSummaryType, updatedAt: new Date().toISOString() }
          : n,
      ),
    );
  }

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setSummaryType(note.summaryType || "brief");
    setEditingId(note.id);
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8 text-gray-700" />
            Smart Notes
          </h1>
          <p className="text-gray-600">Create notes with AI-powered summaries for better organization</p>
        </div>

        {/* Note Creation Form */}
        <div className="bg-white shadow-sm border rounded-lg p-4 mb-8">
          <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
            <Plus className="h-5 w-5 text-gray-700" />
            {editingId ? "Edit Note" : "Create New Note"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded text-lg font-medium text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <textarea
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border p-2 rounded min-h-32 resize-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Summary Type:</label>
              <select
                value={summaryType}
                onChange={(e) => setSummaryType(e.target.value as SummaryType)}
                className="border p-2 rounded text-gray-800"
              >
                <option value="brief">Brief</option>
                <option value="detailed">Detailed</option>
                <option value="bullet">Bullet Points</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!title.trim() || !content.trim() || isGeneratingSummary}
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
                    Generating Summary...
                  </>
                ) : editingId ? (
                  "Update Note"
                ) : (
                  "Save Note"
                )}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="px-4 py-2 border rounded text-gray-700">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notes List */}
        <div className="bg-white shadow-sm border rounded-lg p-4 space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No notes yet</h3>
              <p className="text-gray-500">Create your first note to get started with AI-powered summaries</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl text-gray-900 font-semibold">{note.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(note)} className="text-gray-500 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="text-gray-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                  {note.updatedAt !== note.createdAt && (
                    <span className="ml-2">• Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>

                {note.summary && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Brain className="h-3 w-3" /> AI Summary ({note.summaryType || "brief"})
                      </div>
                      <select
                        value={note.summaryType || "brief"}
                        onChange={(e) => regenerateSummary(note.id, e.target.value as SummaryType)}
                        className="border p-1 rounded text-xs text-gray-700"
                      >
                        <option value="brief">Brief</option>
                        <option value="detailed">Detailed</option>
                        <option value="bullet">Bullet Points</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
                      {note.summaryType === "bullet" ? (
                        <pre className="whitespace-pre-wrap font-sans">{note.summary}</pre>
                      ) : (
                        <p className="italic">{note.summary}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
