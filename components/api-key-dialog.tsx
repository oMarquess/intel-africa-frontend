"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { apiKeyService, CreateApiKeyDto } from "@/lib/api-key.service"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ApiKeyDialogProps {
  children: React.ReactNode
}

export function ApiKeyDialog({ children }: ApiKeyDialogProps) {
  const { getToken } = useAuth()
  const [open, setOpen] = useState(false)
  const [keyName, setKeyName] = useState("")
  const [permissions, setPermissions] = useState("")
  const [expiration, setExpiration] = useState("")
  const [createdKey, setCreatedKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldTouched, setFieldTouched] = useState({
    keyName: false,
    permissions: false,
    expiration: false,
    terms: false
  })

  // Validation: Check if form is valid
  const isFormValid = keyName.trim() !== "" && permissions !== "" && expiration !== "" && termsAccepted

  // Show error only if field has been touched and is invalid
  const showKeyNameError = fieldTouched.keyName && keyName.trim() === ""
  const showPermissionsError = fieldTouched.permissions && permissions === ""
  const showExpirationError = fieldTouched.expiration && expiration === ""
  const showTermsError = fieldTouched.terms && !termsAccepted

  const handleCreateKey = async () => {
    if (!isFormValid) return
    
    setIsSubmitting(true)
    
    try {
      // Get JWT token from Clerk
      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token available')
      }

      // Create API key using the service
      const createData: CreateApiKeyDto = {
        name: keyName.trim(),
        permission: permissions === "full" ? "FULL_ACCESS" : 
                   permissions === "read" ? "READ_ONLY" : "TRANSCRIBE_ONLY",
        expiration_policy: expiration === "never" ? "NEVER" : 
                           expiration === "30" ? "DAYS_30" : 
                           expiration === "90" ? "DAYS_90" : "DAYS_365",
        created_by: "", // Will be populated by the service from JWT token
        permissions: {} // Empty JSON object as requested
      }
      
      const result = await apiKeyService.createApiKey(createData, token)
      
      // Set the created key for display
      setCreatedKey(result.secret_key)
      
    } catch (error) {
      console.error('Failed to create API key:', error)
      // Handle error - could show toast or error message
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyKey = async () => {
    if (createdKey) {
      await navigator.clipboard.writeText(createdKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form
    setKeyName("")
    setPermissions("")
    setExpiration("")
    setCreatedKey("")
    setShowKey(false)
    setTermsAccepted(false)
    setIsSubmitting(false)
    setFieldTouched({
      keyName: false,
      permissions: false,
      expiration: false,
      terms: false
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new API key</DialogTitle>
          <DialogDescription>
            Generate a new API key for accessing the STT service. Make sure to copy and save your key securely.
          </DialogDescription>
        </DialogHeader>

        {!createdKey ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Key name</Label>
              <Input
                id="name"
                placeholder="e.g., Production API, Development Key"
                value={keyName}
                onChange={(e) => {
                  setKeyName(e.target.value)
                  setFieldTouched(prev => ({ ...prev, keyName: true }))
                }}
                disabled={isSubmitting}
                className={showKeyNameError ? "border-red-300 focus:border-red-500" : ""}
              />
              {showKeyNameError && (
                <p className="text-xs text-red-500">Key name is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select 
                  value={permissions} 
                  onValueChange={(value) => {
                    setPermissions(value)
                    setFieldTouched(prev => ({ ...prev, permissions: true }))
                  }} 
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={showPermissionsError ? "border-red-300 focus:border-red-500" : ""}>
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Access</SelectItem>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="transcribe">Transcribe Only</SelectItem>
                  </SelectContent>
                </Select>
                {showPermissionsError && (
                  <p className="text-xs text-red-500">Permissions are required</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiration">Expiration</Label>
                <Select 
                  value={expiration} 
                  onValueChange={(value) => {
                    setExpiration(value)
                    setFieldTouched(prev => ({ ...prev, expiration: true }))
                  }} 
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`${showExpirationError ? "border-red-300 focus:border-red-500" : ""} min-w-[140px]`}>
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
                {showExpirationError && (
                  <p className="text-xs text-red-500">Expiration is required</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => {
                  setTermsAccepted(checked as boolean)
                  setFieldTouched(prev => ({ ...prev, terms: true }))
                }}
                disabled={isSubmitting}
                className={showTermsError ? "border-red-300" : ""}
              />
              <Label htmlFor="terms" className="text-xs leading-tight">
                I understand that this API key should be kept secure and not shared publicly
              </Label>
            </div>
            {showTermsError && (
              <p className="text-xs text-red-500 ml-6">You must accept the terms to continue</p>
            )}

          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>API Key Created</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <code className="bg-muted px-3 py-2 rounded text-sm block break-all">
                    {showKey ? createdKey : createdKey.slice(0, 20) + "••••••••••••••••••••••••••••••••"}
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyKey}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600">API key copied to clipboard!</p>
              )}
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 dark:bg-yellow-900/20 dark:border-yellow-600">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Important:</strong> Save this API key securely now. You won't be able to see it again.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {keyName}
              </div>
              <div>
                <span className="font-medium">Permissions:</span>{" "}
                <Badge variant="secondary" className="ml-1">
                  {permissions === "full" ? "Full Access" : permissions === "read" ? "Read Only" : "Transcribe Only"}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Expiration:</span> {expiration === "never" ? "Never" : `${expiration} days`}
              </div>
              <div>
                <span className="font-medium">Created:</span> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!createdKey ? (
            <>
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleCreateKey}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create API Key"
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
