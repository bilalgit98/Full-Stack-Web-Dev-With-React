"use client";

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={(e) => {
        setToggle(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 roudned-lg flex flex-col gap-6">
        <h2 className="text-xl">Are you sure you want to delete this post? </h2>
        <h2 className="text-red-600 text-sm">
          Pressing the delete button will permanently delete your post
        </h2>
        <button className="bg-red-600 text-sm text-white py-2 px-4">
          Delete Post!
        </button>
      </div>
    </div>
  );
}
