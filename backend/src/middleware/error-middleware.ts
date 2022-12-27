import ApiError from "src/exceptions/api-error";

export default function (err: any, req: any, res: any, next: any) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.message });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
}
