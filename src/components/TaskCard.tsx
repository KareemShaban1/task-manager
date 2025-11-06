import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  name: string;
  description: string | null;
  date: string;
  start_date: string | null;
  end_date: string | null;
  status: "pending" | "in-progress" | "completed";
  comment: string | null;
  project_id: string | null;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

interface TaskCardProps {
  task: Task;
  project?: Project;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const },
  "in-progress": { label: "In Progress", variant: "default" as const },
  completed: { label: "Completed", variant: "default" as const },
};

export const TaskCard = ({ task, project, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{task.name}</CardTitle>
              <Badge 
                variant={statusConfig[task.status].variant}
                className={
                  task.status === "completed" 
                    ? "bg-success text-success-foreground" 
                    : task.status === "in-progress"
                    ? "bg-warning text-warning-foreground"
                    : ""
                }
              >
                {statusConfig[task.status].label}
              </Badge>
            </div>
            {project && (
              <Badge 
                variant="outline" 
                className="mb-2"
                style={{ borderColor: project.color }}
              >
                {project.name}
              </Badge>
            )}
            {task.description && (
              <CardDescription className="mt-2">{task.description}</CardDescription>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(task.date), "MMM dd, yyyy")}</span>
          </div>
          {(task.start_date || task.end_date) && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {task.start_date && format(new Date(task.start_date), "MMM dd")}
                {task.start_date && task.end_date && " - "}
                {task.end_date && format(new Date(task.end_date), "MMM dd, yyyy")}
              </span>
            </div>
          )}
        </div>
        {task.comment && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="text-muted-foreground">{task.comment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
