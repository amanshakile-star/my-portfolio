import { Request, Response, NextFunction } from 'express';
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projects.service';

export async function listProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, search, featured, all } = req.query;

    const projects = await getAllProjects({
      publishedOnly: all === 'true' ? false : true,
      featuredOnly: featured === 'true',
      category: category as string,
      search: search as string,
    });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found.`,
      });
      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNewProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await createProject(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateExistingProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await updateProject(id, req.body);

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await deleteProject(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
