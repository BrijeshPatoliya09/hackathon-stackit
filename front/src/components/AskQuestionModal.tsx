import { useState } from "react";
import {
  Plus,
  X,
  Bold,
  Italic,
  List,
  Link2,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "../hooks/use-toast";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AskQuestionModal = ({ isOpen, onClose }: AskQuestionModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (
      currentTag.trim() &&
      !tags.includes(currentTag.trim()) &&
      tags.length < 5
    ) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || tags.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Question Posted!",
      description: "Your question has been posted successfully.",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTags([]);
    setCurrentTag("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Ask a Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="What's your programming question? Be specific."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Please make sure the title is clear and specific
            </p>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            {/* Editor Toolbar */}
            <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bold size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Italic size={14} />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <List size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link2 size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Image size={14} />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <AlignLeft size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <AlignCenter size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <AlignRight size={14} />
              </Button>
            </div>

            {/* Editor Text Area */}
            <Textarea
              placeholder="Provide details about your question. Include what you've tried and what specific help you need."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 rounded-t-none border-t-0 resize-none"
              rows={8}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>

            {/* Selected Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-2 hover:bg-red-100"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add tags (e.g., javascript, react, typescript)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!currentTag.trim() || tags.length >= 5}
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add up to 5 tags to categorize your question
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={
                !title.trim() ||
                !description.trim() ||
                tags.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;
