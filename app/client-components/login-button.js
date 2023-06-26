'use client'

export default function LoginButton(){
    return (
        <>
        {/* Open the modal using ID.showModal() method */}
        <button className="btn btn-primary" onClick={()=>window.login_modal.showModal()}>Login</button>
        <dialog id="login_modal" className="modal">
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg">Not Yet!</h3>
                <p className="py-4">Login/Accounts in development...</p>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        </>
    )
}