"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface RevokeApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKeyName: string
  onConfirm: () => Promise<void>
  isRevoking: boolean
}

export function RevokeApiKeyDialog({ 
  open, 
  onOpenChange, 
  apiKeyName, 
  onConfirm, 
  isRevoking 
}: RevokeApiKeyDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [error, setError] = useState("")

  const handleRevoke = async () => {
    if (confirmText !== apiKeyName) {
      setError("API key name does not match")
      return
    }

    try {
      setError("")
      await onConfirm()
      onOpenChange(false)
      setConfirmText("")
    } catch (err) {
      setError("Failed to revoke API key")
    }
  }

  const handleClose = () => {
    if (!isRevoking) {
      onOpenChange(false)
      setConfirmText("")
      setError("")
    }
  }

  const isConfirmEnabled = confirmText === apiKeyName && !isRevoking

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[468px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Revoke API Key
          </DialogTitle>
          <DialogDescription className="text-base">
            This action cannot be undone. The API key will be immediately disabled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warning Section */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  This action is permanent
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  All applications using <span className="font-mono bg-red-100 px-1 rounded">{apiKeyName}</span> will lose access immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-revoke" className="text-sm font-medium">
              Type <span className="font-mono bg-red-100 px-1 rounded">{apiKeyName}</span> to confirm:
            </Label>
            <Input
              id="confirm-revoke"
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value)
                setError("")
              }}
              placeholder={`Type "${apiKeyName}" to confirm`}
              className={error ? "border-red-500 focus:border-red-500" : ""}
              disabled={isRevoking}
            />
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isRevoking}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleRevoke}
            disabled={!isConfirmEnabled}
            className="bg-red-600 hover:bg-red-700"
          >
            {isRevoking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Revoking...
              </>
            ) : (
              "Revoke API Key"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
