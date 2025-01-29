<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/task')]
final class TaskController extends AbstractController
{
    #[Route(name: 'app_task_index', methods: ['GET'])]
    public function index(Request $request, TaskRepository $taskRepository): JsonResponse
    {
        $completed = $request->query->get('completed');
        $search = $request->query->get('search');
        $completed = $completed !== null ? filter_var($completed, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null;
        $tasks = $taskRepository->findTasks($completed, $search);
        
        return $this->json($tasks);
    }

    #[Route('/new', name: 'app_task_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $task = new Task();
        $task->setName($data['name']);
        $task->setCompleted($data['completed']);
        
        $entityManager->persist($task);
        $entityManager->flush();
        
        return $this->json(['message' => 'Task created successfully']);
    }

    #[Route('/{id}/edit', name: 'app_task_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, Task $task, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $task->setName($data['name']);
        $task->setCompleted($data['completed']);
        
        $entityManager->flush();
        
        return $this->json(['message' => 'Task updated successfully']);
    }

    #[Route('/{id}', name: 'app_task_delete', methods: ['DELETE'])]
    public function delete(Task $task, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($task);
        $entityManager->flush();
        
        return $this->json(['message' => 'Task deleted successfully']);
    }
}